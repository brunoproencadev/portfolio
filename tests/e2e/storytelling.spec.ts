import { expect, test, type Page } from "@playwright/test";

async function openStory(page: Page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.goto("/");
  await expect(page.locator(".story-enhanced")).toHaveCount(1);
}

async function pinStart(page: Page) {
  return page
    .locator(".pin-spacer")
    .evaluate((el) => el.getBoundingClientRect().top + scrollY - 112);
}

async function progress(page: Page, start: number, value: number) {
  await page.evaluate(
    ({ start, value }) => scrollTo(0, start + innerHeight * 1.2 * value),
    { start, value },
  );
  await expect
    .poll(async () =>
      Math.abs((await page.evaluate(() => scrollY)) - (start + 1080 * value)),
    )
    .toBeLessThan(1.1);
}

test("one bounded scene swaps real screenshots vertically and reverses", async ({
  page,
}) => {
  await openStory(page);
  const start = await pinStart(page);
  const track = page.locator(".industry-track");
  const y = () =>
    track.evaluate(
      (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
    );
  await progress(page, start, 0.15);
  await expect.poll(y).toBe(0);
  const first = await page.locator(".industry-window").boundingBox();
  await progress(page, start, 0.5);
  await expect.poll(y).toBeLessThan(-50);
  const mid = await y();
  await progress(page, start, 0.85);
  await expect.poll(y).toBeLessThan(mid - 50);
  const second = await page.locator(".industry-window").boundingBox();
  expect(Math.abs(first!.y - second!.y)).toBeLessThan(2);
  await progress(page, start, 0.15);
  await expect.poll(y).toBe(0);
  expect(await page.locator(".pin-spacer").count()).toBe(1);
  const added = await page
    .locator(".pin-spacer")
    .evaluate((el) => parseFloat((el as HTMLElement).style.paddingBottom));
  expect(added).toBeLessThanOrEqual(900 * 1.8);
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await expect(
    page.getByRole("link", { name: "Voltar ao início" }),
  ).toBeInViewport();
});

for (const reason of ["focus", "hash", "reduced", "pagehide"] as const) {
  test(`scene releases on ${reason} with every image and link available`, async ({
    page,
  }) => {
    await openStory(page);
    await progress(page, await pinStart(page), 0.5);
    if (reason === "focus")
      await page
        .getByRole("link", { name: "Ler case de Ateliê Ingrid Xavier" })
        .focus();
    else if (reason === "hash")
      await page.evaluate(() => {
        location.hash = "contato";
      });
    else if (reason === "reduced")
      await page.emulateMedia({ reducedMotion: "reduce" });
    else
      await page.evaluate(() =>
        dispatchEvent(new PageTransitionEvent("pagehide")),
      );
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator(".story-enhanced")).toHaveCount(0);
    await expect(page.locator(".industry-track")).not.toHaveAttribute(
      "style",
      /transform/,
    );
    expect(
      await page
        .locator(".industry-window")
        .evaluate((el) => getComputedStyle(el).overflow),
    ).toBe("visible");
    if (reason === "focus")
      await expect(
        page.getByRole("link", { name: "Ler case de Ateliê Ingrid Xavier" }),
      ).toBeInViewport();
    if (reason === "hash")
      await expect(page.locator("#contato")).toBeInViewport();
  });
}

test("resize removes pin on narrow or short windows and restores desktop safely", async ({
  page,
}) => {
  await openStory(page);
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 1440, height: 600 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator(".story-enhanced")).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.getByRole("link", { name: "Ler case de RoboSense Lab" }).click();
  await expect(page).toHaveURL(/projetos\/robosense-lab$/);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.goBack();
  await expect(page.locator("#projetos")).toBeVisible();
  expect(await page.locator(".pin-spacer").count()).toBeLessThanOrEqual(1);
});

for (const fallback of ["no-js", "reduced", "hash"] as const) {
  test(`authentic media load with proportions intact in ${fallback} flow`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      javaScriptEnabled: fallback !== "no-js",
      reducedMotion: fallback === "reduced" ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    try {
      await page.goto(
        "http://127.0.0.1:3100/" + (fallback === "hash" ? "#projetos" : ""),
      );
      await expect(page.locator(".pin-spacer")).toHaveCount(0);
      for (const img of await page.locator(".selected-work figure img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate((el) => (el as HTMLImageElement).naturalWidth),
          )
          .toBeGreaterThan(0);
        const ratio = await img.evaluate((el) => {
          const i = el as HTMLImageElement;
          return Math.abs(
            i.clientWidth / i.clientHeight - i.naturalWidth / i.naturalHeight,
          );
        });
        expect(ratio).toBeLessThan(0.02);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(
        page.locator(".selected-work a[href^='/projetos/']"),
      ).toHaveCount(3);
    } finally {
      await context.close();
    }
  });
}

test("pinned media stays below navigation in wide short viewports", async ({
  page,
}) => {
  await openStory(page);
  for (const viewport of [
    { width: 900, height: 700 },
    { width: 1440, height: 700 },
    { width: 1920, height: 700 },
    { width: 2560, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
    await page.waitForTimeout(250); // ScrollTrigger debounces viewport refresh.
    const start = await pinStart(page);
    await page.evaluate((start) => scrollTo(0, start + 300), start);
    await expect
      .poll(
        async () => (await page.locator(".industry-stage").boundingBox())!.y,
      )
      .toBeCloseTo(112, 0);
    await expect
      .poll(async () => {
        const band = await page.locator(".industry-band").boundingBox();
        return band!.y >= 112 && band!.y + band!.height <= viewport.height;
      })
      .toBe(true);
  }
});

test("mobile defers scroll code until an eligible desktop resize", async ({
  page,
}) => {
  let scrollChunkRequested = false;
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.route("**/_next/static/chunks/*.js", async (route) => {
    const response = await route.fetch();
    if ((await response.text()).includes('".industry-track"'))
      scrollChunkRequested = true;
    await route.fulfill({ response });
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(scrollChunkRequested).toBe(false);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".story-enhanced")).toHaveCount(1);
  expect(scrollChunkRequested).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});
