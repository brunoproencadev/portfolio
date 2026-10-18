import { expect, test, type Page } from "@playwright/test";
import { projects } from "../../src/data/portfolio";

async function progress(page: Page, value: number) {
  await page.evaluate((p) => scrollTo(0, innerHeight * 1.4 * p), value);
  await page.waitForTimeout(650);
}

test("real tools enter after the approved handoff, stay outside media and reverse", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect
    .poll(() =>
      page.locator("[data-scroll-study]").evaluate((el) => el.clientHeight),
    )
    .toBe(2160);
  const tools = page.locator("[data-scroll-study] [data-project-tool]");
  await expect(tools).toHaveCount(5);
  for (const tool of await tools.all())
    await expect(tool).toHaveCSS("opacity", "0");
  await progress(page, 0.64);
  for (const tool of await tools.all())
    await expect(tool).toHaveCSS("opacity", "0");
  await progress(page, 1);
  for (const [index, tool] of (await tools.all()).entries()) {
    await expect(tool).toHaveCSS("opacity", "1");
    await expect(tool).toHaveAttribute(
      "aria-label",
      [...projects[0].stack, "Claude Code"][index],
    );
    const icon = tool.locator("img");
    await expect(icon).toHaveAttribute("alt", "");
    await expect
      .poll(() => icon.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
  for (const viewport of [
    { width: 900, height: 800 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(250);
    await progress(page, 1);
    const frame = (await page.locator(".robo-frame img").boundingBox())!;
    for (const tool of await tools.all()) {
      const bounds = (await tool.boundingBox())!;
      expect(bounds.x >= 0 && bounds.x + bounds.width <= viewport.width).toBe(
        true,
      );
      expect(
        bounds.x + bounds.width <= frame.x ||
          bounds.x >= frame.x + frame.width ||
          bounds.y + bounds.height <= frame.y,
      ).toBe(true);
    }
  }
  await progress(page, 0);
  for (const tool of await tools.all())
    await expect(tool).toHaveCSS("opacity", "0");
  await expect(page.locator(".hero-content")).toHaveCSS("opacity", "1");
});

test("live reduced motion restores accessible tool names and the entire media in normal flow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect
    .poll(() =>
      page.locator("[data-scroll-study]").evaluate((el) => el.clientHeight),
    )
    .toBe(2160);
  await progress(page, 0.8);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".robo-frame")).toHaveCSS("position", "static");
  for (const tool of await page
    .locator("[data-scroll-study] [data-project-tool]")
    .all()) {
    await expect(tool).toHaveCSS("opacity", "1");
    await expect(tool).toHaveCSS("position", "static");
  }
  await expect(page.locator(".hero-end")).toHaveCSS("opacity", "1");
});
