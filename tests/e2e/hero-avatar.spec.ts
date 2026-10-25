import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page
    .locator(".hero-avatar-image")
    .evaluate((image) => (image as HTMLImageElement).decode());
});

test("hover swaps only the o for one second without moving the name, then replays", async ({
  page,
}) => {
  const trigger = page.locator(".hero-avatar-letter");
  const avatar = page.locator(".hero-avatar-image");
  const heading = page.getByRole("heading", {
    level: 1,
    name: "Bruno Proença Silva",
  });
  const before = (await heading.boundingBox())!;
  await trigger.hover();
  const samples = await trigger.evaluate(async (root) => {
    const glyph = root.querySelector(".hero-avatar-glyph")!;
    const image = root.querySelector("img")!;
    const frames: { time: number; glyph: number; avatar: number }[] = [];
    const start = performance.now();
    await new Promise<void>((resolve) => {
      const read = () => {
        const time = performance.now() - start;
        frames.push({
          time,
          glyph: Number(getComputedStyle(glyph).opacity),
          avatar: Number(getComputedStyle(image).opacity),
        });
        if (time >= 1150) resolve();
        else requestAnimationFrame(read);
      };
      read();
    });
    return frames;
  });
  expect(
    samples.some((frame) => frame.avatar > 0.95 && frame.glyph < 0.05),
  ).toBe(true);
  const middle = samples.find((frame) => frame.time >= 400)!;
  expect(middle.avatar).toBe(1);
  expect(middle.glyph).toBe(0);
  expect(samples.at(-1)!.avatar).toBe(0);
  expect(samples.at(-1)!.glyph).toBe(1);
  const after = (await heading.boundingBox())!;
  expect(after).toEqual(before);
  await expect(heading).toHaveAccessibleName("Bruno Proença Silva");
  await page.mouse.move(0, 0);
  await trigger.hover();
  await expect
    .poll(() =>
      avatar.evaluate((image) => Number(getComputedStyle(image).opacity)),
    )
    .toBeGreaterThan(0.95);
  await page.mouse.move(0, 0);
  await expect(avatar).toHaveCSS("opacity", "0");
  await expect(page.locator(".hero-avatar-glyph")).toHaveCSS("opacity", "1");
});

test("reduced motion fades only and a live preference change clears the effect", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".hero-avatar-letter").hover();
  const avatar = page.locator(".hero-avatar-image");
  await expect
    .poll(() =>
      avatar.evaluate((image) => Number(getComputedStyle(image).opacity)),
    )
    .toBeGreaterThan(0.95);
  await expect(avatar).toHaveCSS("transform", "none");
  await expect(page.locator(".hero-avatar-glyph")).toHaveCSS(
    "transform",
    "none",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(avatar).toHaveCSS("opacity", "0");
  await expect(page.locator(".hero-avatar-glyph")).toHaveCSS("opacity", "1");
});

test("an unavailable avatar keeps the letter and full identity readable", async ({
  page,
}) => {
  await page.route("**/_next/image?*", (route) =>
    route.request().url().includes("github-avatar")
      ? route.abort()
      : route.continue(),
  );
  await page.reload();
  await page.locator(".hero-avatar-letter").hover();
  await expect(page.locator(".hero-avatar-glyph")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-avatar-image")).toHaveCSS("opacity", "0");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "Bruno Proença Silva",
  );
});

test("the enlarged avatar requests enough pixels on a dense display", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    const image = page.locator(".hero-avatar-image");
    const density = await image.evaluate(async (node) => {
      const avatar = node as HTMLImageElement;
      await avatar.decode();
      return {
        sourceWidth: Number(new URL(avatar.currentSrc).searchParams.get("w")),
        width: avatar.getBoundingClientRect().width,
        pixels: devicePixelRatio,
      };
    });
    expect(density.width).toBeGreaterThan(100);
    expect(density.sourceWidth).toBeGreaterThanOrEqual(
      Math.ceil(density.width * density.pixels),
    );
  } finally {
    await context.close();
  }
});
