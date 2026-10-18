import { expect, test, type Page } from "@playwright/test";
import { caseProjects } from "../../src/data/case-studies";

async function open(page: Page, slug = "museu-arte-moderna") {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`/projetos/${slug}`);
  await expect(page.locator("[data-case-enhanced]")).toHaveCount(1);
}

for (const project of caseProjects) {
  test(`${project.slug} stages the real capture, reverses and releases live reduced motion`, async ({
    page,
  }) => {
    await open(page, project.slug);
    const media = page.locator(".case-scene .case-media");
    const intro = page.locator(".case-intro");
    await expect(media).toHaveCSS("opacity", "0");
    await expect(page.locator(".case-scene")).toHaveCSS("height", "1800px");
    await page.evaluate(() => scrollTo(0, innerHeight * 0.8));
    await expect(media).toHaveCSS("opacity", "1");
    await expect(intro).toHaveCSS("opacity", "0");
    await expect(intro).toHaveCSS("pointer-events", "none");
    await expect
      .poll(async () => (await media.locator("a").boundingBox())!.height)
      .toBeGreaterThanOrEqual(44);
    await expect
      .poll(async () => {
        const box = (await media.boundingBox())!;
        return Math.abs(box.y + box.height / 2 - 450);
      })
      .toBeLessThan(2);
    const body = page.locator(".case-body");
    const bodyTop = await body.evaluate(
      (el) => el.getBoundingClientRect().top + scrollY,
    );
    await page.evaluate((top) => scrollTo(0, top - innerHeight * 0.5), bodyTop);
    await expect
      .poll(() =>
        body.evaluate((el) =>
          parseFloat(getComputedStyle(el).borderTopLeftRadius),
        ),
      )
      .toBeGreaterThan(5);
    await page.evaluate(() => scrollTo(0, 0));
    await expect(intro).toHaveCSS("opacity", "1");
    await expect(media).toHaveCSS("opacity", "0");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator("[data-case-enhanced]")).toHaveCount(0);
    await expect(media).toHaveCSS("opacity", "1");
    await expect(media).toHaveCSS("transform", "none");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(page.locator("[data-case-enhanced]")).toHaveCount(1);
  });
}

test("case lifecycle and resizing do not accumulate enhancement; focus restores the reading flow", async ({
  page,
}) => {
  await open(page);
  await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pagehide")));
  await expect(page.locator("[data-case-enhanced]")).toHaveCount(0);
  await page.evaluate(() =>
    dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })),
  );
  await expect(page.locator("[data-case-enhanced]")).toHaveCount(1);
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator("[data-case-enhanced]")).toHaveCount(0);
  await expect(page.locator(".case-scene .case-media")).toHaveCSS(
    "transform",
    "none",
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator("[data-case-enhanced]")).toHaveCount(1);
  await page.evaluate(() => scrollTo(0, innerHeight * 0.8));
  await page.locator(".case-media-window").focus();
  await expect(page.locator("[data-case-enhanced]")).toHaveCount(0);
  await expect(page.locator(".case-media-window")).toBeInViewport();
  await expect(page.locator(".case-scene .case-media")).toHaveCSS(
    "transform",
    "none",
  );
});

test("direct fragments and failed scripts preserve the museum narrative and original capture", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/projetos/museu-arte-moderna#contexto");
  await expect(page.locator("#contexto")).toBeInViewport();
  await expect(page.locator("[data-case-enhanced]")).toHaveCount(0);
  await page.evaluate(() => {
    location.hash = "%E0%A4%A";
  });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });
  const fallback = await context.newPage();
  const errors: string[] = [];
  fallback.on("pageerror", (error) => errors.push(error.message));
  await fallback.route("**/_next/static/chunks/*.js", (route) => route.abort());
  await fallback.goto("http://127.0.0.1:3100/projetos/museu-arte-moderna");
  await expect(fallback.locator("h1")).toHaveText("Museu de Arte Moderna");
  await expect(fallback.locator(".case-credits")).toContainText(
    "Miguel Narvais",
  );
  await expect(fallback.locator(".case-media-window img")).toHaveAttribute(
    "width",
    "2340",
  );
  await expect(fallback.locator(".case-media-window img")).toHaveCSS(
    "object-fit",
    "cover",
  );
  await expect(
    fallback.getByRole("link", { name: "Abrir captura completa" }),
  ).toHaveAttribute("href", "/images/projects/museu-arte-moderna/hall.webp");
  await expect(fallback.locator("[data-case-enhanced]")).toHaveCount(0);
  expect(errors).toEqual([]);
  await context.close();
  await page.goto("/");
  await expect(page.locator(".story-enhanced")).toHaveCount(1);
  const window = page.locator(".story-image-wide");
  await expect(window.locator("img")).toHaveAttribute("width", "2340");
  await expect(window.locator("img")).toHaveCSS("object-fit", "cover");
  const frame = (await window.boundingBox())!;
  const image = (await window.locator("img").boundingBox())!;
  expect(Math.abs(image.width - frame.width)).toBeLessThan(1.1);
  expect(Math.abs(image.height - frame.height)).toBeLessThan(1.1);
});

test("keyboard reading started before hydration takes precedence over a late motion import", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route("**/_next/static/chunks/*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await route.continue();
  });
  await page.goto("/projetos/museu-arte-moderna", { waitUntil: "commit" });
  const repository = page.getByRole("link", {
    name: "Ver repositório",
    exact: true,
  });
  await repository.focus();
  await expect(page.locator(".contact-passage")).toHaveAttribute(
    "data-running",
    "false",
  );
  await expect(repository).toBeFocused();
  await expect(repository).toBeInViewport();
  await expect(page.locator("[data-case-enhanced]")).toHaveCount(0);
});
