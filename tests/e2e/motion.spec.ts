import { expect, test, type Page, type Route } from "@playwright/test";

async function interceptSequence(
  page: Page,
  handle: (route: Route) => Promise<void>,
  marker = '".hero-title-line"',
) {
  await page.route("**/_next/static/chunks/*.js", async (route) => {
    const response = await route.fetch();
    if ((await response.text()).includes(marker)) await handle(route);
    else await route.fulfill({ response });
  });
}

async function freezeClock(page: Page) {
  const now = new Date();
  await page.clock.install({ time: now });
  await page.clock.pauseAt(now);
}

test("greeting and hero entrance complete within 2s, keeps content available and does not replay", async ({
  page,
}, testInfo) => {
  await freezeClock(page);
  await page.goto("/");
  const skip = page.getByRole("button", { name: "Pular intro" });
  await expect(skip).toBeVisible();
  await expect(page.locator(".hero-arc")).toHaveAttribute("style", /translate/);
  await page.clock.runFor(32);
  await expect(page.locator(".hero-arc")).toHaveAttribute("style", /transform/);
  await expect(page.locator("#inicio")).toBeVisible();
  expect(
    await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).overflow),
  ).not.toBe("hidden");
  await page.clock.runFor(400);
  await page.screenshot({ path: testInfo.outputPath("intro-400ms.png") });
  await expect(skip).toBeVisible();
  await page.clock.runFor(1500);
  await expect(skip).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  await expect(page.locator(".hero-arc")).not.toHaveAttribute(
    "style",
    /transform/,
  );
  await page.screenshot({ path: testInfo.outputPath("intro-complete.png") });
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeVisible();
  await expect(skip).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
});

test("reveals move once, keep text opaque and release inline transforms", async ({
  page,
}, testInfo) => {
  await freezeClock(page);
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.clock.runFor(1950);
  const artwork = page.locator(".project-artwork").first();
  await artwork.evaluate((element) =>
    window.scrollTo(
      0,
      element.getBoundingClientRect().top + scrollY - innerHeight * 0.8,
    ),
  );
  await page.clock.runFor(150);
  await expect(artwork).toHaveAttribute("style", /transform/);
  const during = await artwork.boundingBox();
  await expect(artwork).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("reveal-150ms.png") });
  await page.clock.runFor(750);
  await expect(artwork).not.toHaveAttribute("style", /transform/);
  const after = await artwork.boundingBox();
  expect(during!.y).toBeGreaterThan(after!.y);
  await page.screenshot({ path: testInfo.outputPath("reveal-complete.png") });
  await page.evaluate(() => scrollTo(0, 0));
  await page.clock.runFor(100);
  await artwork.evaluate((element) => element.scrollIntoView());
  await page.clock.runFor(100);
  await expect(artwork).not.toHaveAttribute("style", /transform/);
});

for (const cancellation of ["reduced", "pagehide", "focus"] as const) {
  test(`active reveals revert and stay stopped after ${cancellation}`, async ({
    page,
  }) => {
    await freezeClock(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const artwork = page.locator(".project-artwork").first();
    await artwork.evaluate((element) => element.scrollIntoView());
    await page.clock.runFor(100);
    await expect(artwork).toHaveAttribute("style", /transform/);
    if (cancellation === "reduced")
      await page.emulateMedia({ reducedMotion: "reduce" });
    else if (cancellation === "pagehide")
      await page.evaluate(() =>
        dispatchEvent(new PageTransitionEvent("pagehide")),
      );
    else await page.locator(".project-link").first().focus();
    await expect(artwork).not.toHaveAttribute("style", /transform/);
    await page
      .locator(".skill-row")
      .first()
      .evaluate((element) => element.scrollIntoView());
    await page.clock.runFor(100);
    await expect(page.locator(".skill-row").first()).not.toHaveAttribute(
      "style",
      /transform/,
    );
  });
}

test("reveal chunk failure leaves sections and keyboard navigation usable", async ({
  page,
}) => {
  let intercepted = false;
  await interceptSequence(
    page,
    async (route) => {
      intercepted = true;
      await route.abort();
    },
    '".project-artwork, .about-copy, .skill-row"',
  );
  await page.goto("/");
  await expect.poll(() => intercepted).toBe(true);
  await page
    .locator(".skill-row")
    .first()
    .evaluate((element) => element.scrollIntoView());
  await expect(page.locator(".skill-row").first()).not.toHaveAttribute(
    "style",
    /transform/,
  );
  await page.locator(".skill-row .text-link").first().focus();
  await expect(page.locator(".skill-row .text-link").first()).toBeFocused();
});

test("initial reduced motion avoids animation chunks and capsule motion", async ({
  page,
}) => {
  let loadedAnimation = false;
  await page.route("**/_next/static/chunks/*.js", async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    loadedAnimation ||=
      body.includes('".hero-title-line"') ||
      body.includes('".project-artwork, .about-copy, .skill-row"');
    await route.fulfill({ response });
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.locator(".capsule-links")).toHaveCSS(
    "animation-duration",
    "0s",
  );
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  expect(loadedAnimation).toBe(false);
});

test("keyboard skip and Escape cancel without trapping or losing focus", async ({
  page,
}) => {
  await freezeClock(page);
  await page.goto("/");
  const skip = page.getByRole("button", { name: "Pular intro" });
  await expect(skip).toBeVisible();
  await skip.focus();
  await page.keyboard.press("Enter");
  await expect(skip).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  await expect(page.locator("#inicio")).toBeFocused();
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  await expect(skip).toBeVisible();
  await page.getByRole("button", { name: "Menu", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(skip).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeFocused();
});

test("denied storage does not stop the intro from completing", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new DOMException("Denied", "SecurityError");
      },
    });
  });
  await freezeClock(page);
  await page.goto("/");
  await expect(page.locator(".hero-arc")).toHaveAttribute("style", /translate/);
  await page.clock.runFor(32);
  await expect(page.locator(".hero-arc")).toHaveAttribute("style", /transform/);
  await page.clock.runFor(1950);
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  await expect(page.locator("#inicio")).toBeVisible();
});

test("failed animation chunk restores the static page", async ({ page }) => {
  let intercepted = false;
  await interceptSequence(page, async (route) => {
    intercepted = true;
    await route.abort();
  });
  await page.goto("/");
  await expect.poll(() => intercepted).toBe(true);
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  await expect(page.locator("#inicio")).toBeVisible();
  await page.getByRole("link", { name: "Explorar projetos" }).click();
  await expect(page).toHaveURL(/#projetos$/);
});

test("independent 2.2s timeout rejects a late animation import", async ({
  page,
}) => {
  let intercepted = false;
  let release!: () => void;
  const delayed = new Promise<void>((resolve) => {
    release = resolve;
  });
  await interceptSequence(page, async (route) => {
    intercepted = true;
    await delayed;
    await route.continue();
  });
  await freezeClock(page);
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect.poll(() => intercepted).toBe(true);
  await page.clock.runFor(2199);
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeVisible();
  await page.clock.runFor(1);
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  release();
  await page.waitForLoadState("networkidle");
  await page.clock.runFor(1500);
  await expect(page.locator(".hero-arc")).not.toHaveAttribute(
    "style",
    /transform/,
  );
});

test("direct hashes and live reduced motion bypass or cancel the intro", async ({
  page,
}) => {
  await page.goto("/#sobre");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  await expect(page.locator("#sobre")).toBeInViewport();
  await page.evaluate(() => sessionStorage.clear());
  await freezeClock(page);
  await page.goto("/");
  await expect(page.locator(".hero-arc")).toHaveAttribute("style", /translate/);
  await page.clock.runFor(32);
  await expect(page.locator(".hero-arc")).toHaveAttribute("style", /transform/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
  await expect(page.locator(".hero-arc")).not.toHaveAttribute(
    "style",
    /transform/,
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.runFor(2500);
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".intro-curtain")).toBeHidden();
});
