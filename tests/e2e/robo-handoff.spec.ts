import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, width = 1440) {
  await page.setViewportSize({ width, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.goto("/");
  await expect(page.locator(".cover-enhanced")).toHaveCount(1);
}

test("RoboSense recedes before its text and restores on reverse scroll", async ({
  page,
}) => {
  await open(page);
  const visual = page.locator(".robo-visual");
  await page.evaluate(() => scrollTo(0, innerHeight * 1.4));
  await expect(visual).toHaveCSS("opacity", "1");
  await expect(
    page.locator(".robo-visual [data-project-tool]").last(),
  ).toHaveCSS("opacity", "1");
  const width = (await page.locator(".robo-frame").boundingBox())!.width;
  await page.evaluate(() => scrollTo(0, innerHeight * 1.7));
  await expect
    .poll(async () =>
      Number(await visual.evaluate((el) => getComputedStyle(el).opacity)),
    )
    .toBeLessThan(0.9);
  expect((await page.locator(".robo-frame").boundingBox())!.width).toBeLessThan(
    width * 0.95,
  );
  await page.evaluate(() => scrollTo(0, innerHeight * 2));
  await expect(visual).toHaveCSS("opacity", "0");
  await expect(page.locator(".work-robo h2")).toBeInViewport();
  await page.evaluate(() => scrollTo(0, innerHeight * 1.4));
  await expect(visual).toHaveCSS("opacity", "1");
  await expect
    .poll(async () => (await page.locator(".robo-frame").boundingBox())!.width)
    .toBeCloseTo(width, 0);
});

for (const width of [1440, 375]) {
  test(`About covers the reading section with a flattening top edge at ${width}px`, async ({
    page,
  }) => {
    await open(page, width);
    if (width === 375) {
      const visual = page.locator(".robo-visual");
      const end = await visual.evaluate(
        (el) =>
          el.getBoundingClientRect().bottom + scrollY - innerHeight * 0.15,
      );
      await page.evaluate((y) => scrollTo(0, y), Math.ceil(end));
      await expect(visual).toHaveCSS("opacity", "0");
    }
    const surface = page.locator(".about-surface");
    const top = await surface.evaluate(
      (el) => el.getBoundingClientRect().top + scrollY,
    );
    await page.evaluate((y) => scrollTo(0, y - innerHeight * 0.5), top);
    await expect
      .poll(() =>
        surface.evaluate((el) =>
          parseFloat(getComputedStyle(el).borderTopLeftRadius),
        ),
      )
      .toBeGreaterThan(10);
    await expect(surface).toHaveCSS("border-bottom-left-radius", "0px");
    const copy = page.locator(".work-robo");
    const readingTop = (await copy.boundingBox())!.y;
    await page.evaluate(() => scrollBy(0, 100));
    expect(Math.abs((await copy.boundingBox())!.y - readingTop)).toBeLessThan(
      1.1,
    );
    await page.evaluate((y) => scrollTo(0, y), top);
    // WebKit rounds the document scroll position by up to one CSS pixel.
    await expect
      .poll(() =>
        surface.evaluate((el) =>
          parseFloat(getComputedStyle(el).borderTopLeftRadius),
        ),
      )
      .toBeLessThan(0.1);
    await expect(page.locator(".about-copy")).toHaveCSS("opacity", "1");
    const link = page.locator(".work-robo a").first();
    await link.focus();
    await expect(link).toBeInViewport();
    expect(
      await link.evaluate((el) => {
        const box = el.getBoundingClientRect();
        return el.contains(
          document.elementFromPoint(
            box.x + box.width / 2,
            box.y + box.height / 2,
          ),
        );
      }),
    ).toBe(true);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".cover-enhanced")).toHaveCount(0);
    await expect(copy).toHaveCSS("position", "static");
    await expect(page.locator(".robo-visual")).toHaveCSS("opacity", "1");
  });
}

test("Claude Code is present in every project; left blur belongs only to the horizontal carousel", async ({
  page,
}) => {
  await open(page);
  await expect(
    page.locator('[data-project-tool][aria-label="Claude Code"]'),
  ).toHaveCount(3);
  await expect(page.locator(".robo-frame .window-lights span")).toHaveCount(3);
  const edge = () =>
    page
      .locator(".story-window")
      .evaluate((el) => getComputedStyle(el, "::after").backdropFilter);
  expect(await edge()).toBe("blur(10px)");
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator(".story-enhanced")).toHaveCount(0);
  expect(await edge()).toBe("none");
});
