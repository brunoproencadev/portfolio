import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 800 });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.goto("/");
  await expect(page.locator(".story-enhanced")).toHaveCount(1);
});

for (const keepFocus of [true, false]) {
  test(`live reduced motion preserves the current project with focus ${keepFocus}`, async ({
    page,
  }) => {
    const heading = page.locator("#titulo-industry-week-senai");
    await heading.focus();
    await expect(heading).toBeInViewport({ ratio: 1 });
    if (!keepFocus) await heading.evaluate((element) => element.blur());
    const before = (await heading.boundingBox())!.y;
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".story-enhanced")).toHaveCount(0);
    await expect
      .poll(async () => Math.abs((await heading.boundingBox())!.y - before))
      .toBeLessThan(24);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(page.locator(".story-enhanced")).toHaveCount(1);
    await expect(heading).toBeInViewport({ ratio: 1 });
    await expect
      .poll(async () => Math.abs((await heading.boundingBox())!.y - before))
      .toBeLessThan(24);
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
    if (keepFocus) await expect(heading).toBeFocused();
  });
}

test("carousel announces the current project, reverses, and clears its state in linear flow", async ({
  page,
}) => {
  const links = page.locator(".story-progress a");
  for (const index of [0, 1, 2, 3, 1, 0]) {
    await page.locator(".story-band h3").nth(index).focus();
    await expect(links.nth(index)).toHaveAttribute("aria-current", "location");
    await expect(page.locator(".story-progress [aria-current]")).toHaveCount(1);
    await expect(links.nth(index)).toHaveCSS(
      "text-decoration-line",
      "underline",
    );
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".story-progress [aria-current]")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".story-progress [aria-current]")).toHaveCount(1);
});
