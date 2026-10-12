import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#inicio");
  await expect(page.locator(".capsule")).toHaveAttribute(
    "data-motion-ready",
    "true",
  );
  await page.evaluate(() => document.fonts.ready);
});

test("one surface interpolates dimensions with a stable center and unscaled avatar", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const frames = await page.locator(".capsule").evaluate(async (root) => {
    const samples: {
      width: number;
      height: number;
      x: number;
      top: number;
      avatar: number;
      time: number;
    }[] = [];
    const read = (time: number) => {
      const r = root.getBoundingClientRect();
      samples.push({
        width: r.width,
        height: r.height,
        x: r.x + r.width / 2,
        top: r.top,
        avatar: root.querySelector("img")!.getBoundingClientRect().width,
        time,
      });
    };
    read(0);
    (root.querySelector("button") as HTMLButtonElement).click();
    await new Promise<void>((resolve, reject) => {
      const start = performance.now();
      const tick = () => {
        const time = performance.now() - start;
        read(time);
        if (time > 1500) return reject(new Error("Island never settled"));
        if (
          root.hasAttribute("data-open") &&
          !root.hasAttribute("data-animating")
        )
          resolve();
        else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    return samples;
  });
  expect(frames[0].width).toBe(322);
  expect(frames[0].height).toBe(60);
  expect(frames.at(-1)!.width).toBe(404);
  expect(frames.at(-1)!.height).toBeGreaterThan(350);
  expect(
    frames.some((f) => f.width > 325 && f.width < 401 && f.height > 65),
  ).toBe(true);
  for (const frame of frames) {
    expect(Math.abs(frame.x - 720)).toBeLessThanOrEqual(2);
    expect(frame.top).toBe(32);
    expect(frame.avatar).toBe(40);
  }
  await testInfo.attach("opening-frames", {
    body: JSON.stringify(frames),
    contentType: "application/json",
  });
});

test("reversal responds during motion and exiting links are immediately inert", async ({
  page,
}) => {
  const nav = page.locator(".capsule");
  await nav
    .locator("button")
    .evaluate((button) => (button as HTMLButtonElement).click());
  await expect(nav).toHaveAttribute("data-animating", "true");
  await nav
    .locator("button")
    .evaluate((button) => (button as HTMLButtonElement).click());
  await expect(page.locator(".capsule-panel")).toHaveAttribute("inert", "");
  await expect(nav.getByRole("link")).toHaveCount(0);
  await nav
    .locator("button")
    .evaluate((button) => (button as HTMLButtonElement).click());
  await expect(nav).not.toHaveAttribute("data-animating");
  await expect(nav.getByRole("link")).toHaveCount(5);
  await expect(nav.locator("button")).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(nav).not.toHaveAttribute("data-animating");
  expect((await nav.boundingBox())!.height).toBe(60);
});

test("keyboard focus and runtime reduced motion finish clipped transitions immediately", async ({
  page,
}) => {
  const nav = page.locator(".capsule");
  await nav
    .locator("button")
    .evaluate((button) => (button as HTMLButtonElement).click());
  const contact = nav.getByRole("link", { name: "Contato", exact: true });
  await contact.focus();
  await expect(contact).toBeInViewport({ ratio: 1 });
  await expect(nav).not.toHaveAttribute("data-animating");
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(nav).not.toHaveAttribute("data-animating");
  await nav.locator("button").click();
  await expect(nav).not.toHaveAttribute("data-animating");
  expect(
    await nav.evaluate(
      (root) =>
        root
          .getAnimations({ subtree: true })
          .filter((a) => a.playState === "running").length,
    ),
  ).toBe(0);
});

test("outside pointer resolves panel focus without taking the destination focus", async ({
  page,
}) => {
  const nav = page.locator(".capsule");
  await nav.locator("button").click();
  await nav.getByRole("link", { name: "Contato", exact: true }).focus();
  await page.locator(".hero-end").click();
  await expect(nav.locator("button")).toHaveAttribute("aria-expanded", "false");
  expect(
    await page
      .locator(".capsule-panel")
      .evaluate((panel) => panel.contains(document.activeElement)),
  ).toBe(false);
});

test("a failed animation still exposes every destination", async ({ page }) => {
  await page.evaluate(() => {
    const original = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      if (this.classList.contains("capsule"))
        throw new Error("Simulated island animation failure");
      return original.apply(this, args);
    };
  });
  const nav = page.locator(".capsule");
  await nav.locator("button").click();
  await expect(nav).not.toHaveAttribute("data-animating");
  await expect(nav.getByRole("link")).toHaveCount(5);
  await nav.getByRole("link", { name: "Contato", exact: true }).click();
  await expect(page.locator("#contato")).toBeFocused();
});
