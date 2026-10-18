import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, width = 1440, height = 900) {
  await page.setViewportSize({ width, height });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.goto("/");
  await expect(page.locator(".about-copy")).toHaveAttribute(
    "data-section-motion",
    "true",
  );
}

for (const width of [1440, 375]) {
  test(`supporting sections animate reversibly and contact stays natural at ${width}px`, async ({
    page,
  }) => {
    await open(page, width, 900);
    for (const selector of [
      ".work-robo .project-copy",
      ".about-heading",
      ".about-copy",
      ".work-introduction",
      ".skills-section .section-heading",
      ".skill-row",
    ]) {
      const target = page.locator(selector).first();
      await expect(target).toHaveAttribute("data-section-motion", "true");
      await target.evaluate((el) =>
        scrollTo(
          0,
          el.getBoundingClientRect().top + scrollY - innerHeight * 0.4,
        ),
      );
      await expect(target).toHaveCSS("opacity", "1");
      await expect
        .poll(() =>
          target.evaluate(
            (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
          ),
        )
        .toBe(0);
      await expect(target).toHaveCSS("filter", "none");
      const center = await page.evaluate(() => scrollY);
      await target.evaluate((el) =>
        scrollTo(
          0,
          el.getBoundingClientRect().top +
            scrollY +
            (el as HTMLElement).offsetHeight * 0.98,
        ),
      );
      await expect
        .poll(() =>
          target.evaluate(
            (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
          ),
        )
        .toBeLessThan(-10);
      await expect(target).toHaveCSS("opacity", "1");
      await page.evaluate((y) => scrollTo(0, y), center);
      await expect
        .poll(() =>
          target.evaluate(
            (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42,
          ),
        )
        .toBe(0);
      await expect(target).toHaveCSS("opacity", "1");
    }
    await page.goto("/#contato");
    await expect(page.locator("#contato")).toBeFocused();
    for (const selector of [
      ".contact-section",
      ".contact-section [data-scroll-copy]",
      ".contact-actions",
      ".site-footer",
    ]) {
      await expect(page.locator(selector)).not.toHaveAttribute(
        "style",
        /transform|opacity|filter/,
      );
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("crossed ribbons loop, react to both scroll directions and stop offscreen or on reduced motion", async ({
  page,
}) => {
  await open(page);
  const passage = page.locator(".contact-passage");
  const tracks = page.locator(".ribbon-track");
  await expect(passage).toHaveAttribute("data-running", "false");
  await passage.scrollIntoViewIfNeeded();
  await expect(passage).toHaveAttribute("data-running", "true");
  await expect(passage.getByRole("button")).toHaveCount(0);
  const angles = await page
    .locator(".contact-ribbon")
    .evaluateAll((elements) =>
      elements.map(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).b,
      ),
    );
  expect(angles[0]).toBeLessThan(0);
  expect(angles[1]).toBeGreaterThan(0);
  const geometry = await tracks.first().evaluate((el) => {
    const [a, b] = Array.from(el.children) as HTMLElement[];
    return {
      a: a.offsetWidth,
      b: b.offsetWidth,
      gap: b.offsetLeft - a.offsetLeft - a.offsetWidth,
    };
  });
  expect(geometry.a).toBe(geometry.b);
  expect(Math.abs(geometry.gap)).toBeLessThanOrEqual(1);
  const x = () =>
    tracks
      .first()
      .evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41,
      );
  // Signed distance modulo one repeated group remains meaningful across a seam.
  const distance = (before: number, after: number) =>
    ((after - before + geometry.a * 1.5) % geometry.a) - geometry.a / 2;
  await page.waitForTimeout(1400);
  let before = await x();
  await page.waitForTimeout(200);
  const idle = distance(before, await x());
  expect(idle).toBeLessThan(-1);
  before = await x();
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(200);
  expect(distance(before, await x())).toBeLessThan(idle * 1.5);
  await page.waitForTimeout(1200);
  before = await x();
  await page.mouse.wheel(0, -180);
  await page.waitForTimeout(200);
  expect(distance(before, await x())).toBeGreaterThan(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(passage).toHaveAttribute("data-running", "false");
  await expect(tracks.first()).toHaveCSS("transform", "none");
  await expect(page.locator("[data-section-motion]")).toHaveCount(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await passage.scrollIntoViewIfNeeded();
  await expect(passage).toHaveAttribute("data-running", "true");
  await page.evaluate(() => scrollTo(0, 0));
  await expect(passage).toHaveAttribute("data-running", "false");
  before = await x();
  await page.waitForTimeout(200);
  expect(await x()).toBe(before);
});

test("page lifecycle releases motion and restores without duplicate pins", async ({
  page,
}) => {
  await open(page);
  await page.locator(".contact-passage").scrollIntoViewIfNeeded();
  await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pagehide")));
  await expect(page.locator("[data-section-motion]")).toHaveCount(0);
  await expect(page.locator(".contact-passage")).toHaveAttribute(
    "data-running",
    "false",
  );
  await page.evaluate(() =>
    dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })),
  );
  await expect(page.locator(".about-copy")).toHaveAttribute(
    "data-section-motion",
    "true",
  );
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
});
