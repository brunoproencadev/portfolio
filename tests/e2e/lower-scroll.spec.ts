import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.goto("/");
  await expect(page.locator(".story-enhanced")).toHaveCount(1);
});

test("Atelie preview is bounded and retains a direct link to the entire capture", async ({
  page,
}) => {
  const section = await page.locator(".story-band:nth-child(3)").boundingBox();
  expect(section!.height).toBeLessThan(1100);
  const preview = await page
    .locator(".story-band:nth-child(3) .story-image")
    .boundingBox();
  expect(preview!.height).toBeLessThanOrEqual(620);
  await page.locator("#titulo-atelie-ingrid-xavier").focus();
  await page.getByRole("link", { name: "Abrir captura completa" }).click();
  await expect(page).toHaveURL(
    /\/images\/projects\/atelie-ingrid\/catalog\.webp$/,
  );
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluate((el) => (el as HTMLImageElement).naturalHeight),
    )
    .toBe(3524);
});

test("focusing lower content then wheeling preserves layout and keeps focus below navigation", async ({
  page,
}) => {
  for (const selector of [
    ".work-robo a",
    ".skill-row:last-child a",
    ".contact-links a",
  ]) {
    const height = await page.evaluate(() => document.body.scrollHeight);
    const link = page.locator(selector).first();
    await link.focus();
    const before = (await link.boundingBox())!;
    expect(before.y).toBeGreaterThanOrEqual(112);
    expect(before.y + before.height).toBeLessThanOrEqual(900);
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
    const beforeScroll = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, 50);
    await page.waitForTimeout(600);
    const after = (await link.boundingBox())!;
    const delta = (await page.evaluate(() => scrollY)) - beforeScroll;
    expect(delta).toBeGreaterThanOrEqual(0);
    expect(delta).toBeLessThanOrEqual(52);
    expect(Math.abs(after.y - before.y + delta)).toBeLessThan(2);
    expect(await page.evaluate(() => document.body.scrollHeight)).toBe(height);
  }
});

test("About stays readable in its reading range and releases on reduced motion", async ({
  page,
}) => {
  const section = page.locator(".about-section");
  await section.evaluate((el) =>
    scrollTo(0, el.getBoundingClientRect().top + scrollY - 112),
  );
  await expect(page.locator(".about-copy")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".about-copy")).toHaveCSS("transform", "none");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("lower sections keep the same grid when anchor navigation resumes", async ({
  page,
}) => {
  await page.goto("/#competencias");
  await expect(page.locator("#competencias")).toBeInViewport();
  const skills = page.locator(".skills-section");
  await expect
    .poll(() =>
      skills.evaluate((el) => Math.abs(el.getBoundingClientRect().top - 112)),
    )
    .toBeLessThan(1.1);
  const height = (await skills.boundingBox())!.height;
  const headingTop = (await page.locator("#competencias").boundingBox())!.y;
  await page.mouse.wheel(0, 50);
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  expect((await skills.boundingBox())!.height).toBeCloseTo(height, 0);
  expect(
    Math.abs(
      (await page.locator("#competencias").boundingBox())!.y - headingTop,
    ),
  ).toBeLessThan(100);
});
