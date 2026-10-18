import { expect, test } from "@playwright/test";

const names = [
  "Museu de Arte Moderna",
  "Industry Week SENAI",
  "Ateliê Ingrid Xavier",
  "kord",
];
const slugs = [
  "museu-arte-moderna",
  "industry-week-senai",
  "atelie-ingrid-xavier",
  "kord",
];

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
});

test("four real projects keep their order, links and full width through forward and reverse navigation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".story-enhanced")).toHaveCount(1);
  await expect(page.locator(".story-band h3")).toHaveText(names);
  for (const i of [0, 1, 2, 3, 2, 1, 0]) {
    await page.locator(`#titulo-${slugs[i]}`).focus();
    const band = page.locator(".story-band").nth(i);
    await expect(band.locator("h3")).toBeInViewport({ ratio: 1 });
    await expect(band.locator(".work-links a").first()).toBeInViewport({
      ratio: 1,
    });
    await expect(page.locator(`.story-backdrop-${i}`)).toHaveCSS(
      "opacity",
      "0.16",
    );
    await expect
      .poll(async () => Math.abs((await band.boundingBox())!.x))
      .toBeLessThan(1.1);
    const image = band.locator("figure img");
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
  for (const i of [3, 1, 2, 0]) {
    await page.locator(".story-progress a").nth(i).click();
    await expect(page.locator(`#titulo-${slugs[i]}`)).toBeFocused();
    await expect(page.locator(`#titulo-${slugs[i]}`)).toBeInViewport({
      ratio: 1,
    });
  }
  await expect(page.locator(".story-band").first()).toContainText(
    "ainda sem contribuições no repositório",
  );
  await expect(page.locator(".story-band").last()).toContainText(
    "marca fictícia",
  );
  await expect(
    page.locator(
      "a[href='/projetos/museu-arte-moderna'], a[href='/projetos/kord']",
    ),
  ).toHaveCount(0);
});

test("Clawd stays above the RoboSense frame and centered at supported desktop sizes", async ({
  page,
}) => {
  await page.goto("/");
  const clawd = page.locator('.robo-visual [aria-label="Claude Code"]');
  await expect(clawd.locator("img")).toHaveAttribute(
    "src",
    "/images/tools/clawd.svg",
  );
  for (const viewport of [
    { width: 900, height: 800 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(300);
    await page.evaluate(() => scrollTo(0, innerHeight * 1.4));
    await expect(clawd).toHaveCSS("opacity", "1");
    await expect
      .poll(async () => {
        const box = (await clawd.boundingBox())!;
        return Math.abs(box.x + box.width / 2 - viewport.width / 2);
      })
      .toBeLessThan(1.1);
    const box = (await clawd.boundingBox())!;
    const frame = (await page.locator(".robo-frame").boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(112);
    expect(box.y + box.height).toBeLessThan(frame.y);
  }
});

test("popup arrival overshoots once and live reduced motion clears its transforms", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".story-enhanced")).toHaveCount(1);
  const samples = await page.evaluate(async () => {
    const tool = document.querySelector(".story-band [data-project-tool]")!;
    const values: number[] = [];
    (
      document.querySelector("#titulo-museu-arte-moderna") as HTMLElement
    ).focus();
    const start = performance.now();
    while (performance.now() - start < 1200) {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(tool).transform);
      values.push(Math.hypot(matrix.a, matrix.b));
      await new Promise(requestAnimationFrame);
    }
    return values;
  });
  expect(Math.max(...samples)).toBeGreaterThan(1.04);
  expect(samples.at(-1)).toBeCloseTo(1, 2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for (const tool of await page.locator("[data-project-tool]").all())
    await expect(tool).toHaveCSS("transform", "none");
});

for (const mode of ["no-js", "reduced"] as const) {
  test(`new projects are legible and have real media in ${mode} mobile flow`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      javaScriptEnabled: mode !== "no-js",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/");
    await expect(page.locator(".story-band h3")).toHaveText(names);
    for (const i of [0, 3]) {
      const band = page.locator(".story-band").nth(i);
      await band.locator("h3").scrollIntoViewIfNeeded();
      await expect(band.locator("h3")).toBeInViewport({ ratio: 1 });
      await expect(band.locator(".work-links a")).toHaveAttribute(
        "href",
        /^https:\/\/github\.com\//,
      );
      await band.locator("figure img").scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          band
            .locator("figure img")
            .evaluate((el) => (el as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await context.close();
  });
}
