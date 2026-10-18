import { expect, test } from "@playwright/test";

for (const width of [1440, 375]) {
  test(`carousel tools follow the image, replay and release at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() =>
      sessionStorage.setItem("portfolio-intro-seen", "true"),
    );
    await page.goto("/");
    await expect(page.locator(".about-copy")).toHaveAttribute(
      "data-section-motion",
      "true",
    );
    const visual = page.locator(".story-visual").first();
    const tool = visual.locator("[data-project-tool]").first();
    await expect(tool).toHaveCSS("opacity", "0");
    const samples = await page.evaluate(async () => {
      const visual = document.querySelector<HTMLElement>(".story-visual")!;
      const tool = visual.querySelector<HTMLElement>("[data-project-tool]")!;
      const image = visual.querySelector("img")!;
      if (innerWidth >= 1100)
        document
          .querySelector<HTMLElement>("#titulo-museu-arte-moderna")!
          .focus();
      else
        scrollTo({
          top: visual.getBoundingClientRect().top + scrollY - 180,
          behavior: "instant",
        });
      const values: {
        time: number;
        opacity: number;
        scale: number;
        imageVisible: boolean;
      }[] = [];
      const start = performance.now();
      while (performance.now() - start < 1400) {
        const css = getComputedStyle(tool);
        const matrix = new DOMMatrixReadOnly(css.transform);
        const bounds = image.getBoundingClientRect();
        values.push({
          time: performance.now() - start,
          opacity: Number(css.opacity),
          scale: Math.hypot(matrix.a, matrix.b),
          imageVisible: bounds.bottom > 0 && bounds.top < innerHeight,
        });
        await new Promise(requestAnimationFrame);
      }
      return values;
    });
    const visibleImage = samples.find((sample) => sample.imageVisible)!;
    const visibleTool = samples.find((sample) => sample.opacity > 0.01)!;
    expect(visibleImage).toBeTruthy();
    expect(visibleTool.time - visibleImage.time).toBeGreaterThan(150);
    expect(Math.max(...samples.map((sample) => sample.scale))).toBeGreaterThan(
      1.04,
    );
    expect(samples.at(-1)!.opacity).toBe(1);
    await expect
      .poll(() =>
        tool.evaluate((el) => {
          const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
          return Math.hypot(matrix.a, matrix.b);
        }),
      )
      .toBeCloseTo(1, 2);
    const readingY = await page.evaluate(() => scrollY);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await expect(tool).toHaveCSS("opacity", "0");
    await page.evaluate(
      (top) => scrollTo({ top, behavior: "instant" }),
      readingY,
    );
    await expect(tool).toHaveCSS("opacity", "1");
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const item of await page.locator("[data-project-tool]").all()) {
      await expect(item).toHaveCSS("opacity", "1");
      await expect(item).toHaveCSS("transform", "none");
    }
    await expect(page.locator(".skill-row")).toHaveCount(5);
    const museum = page
      .locator(".skill-row")
      .filter({ hasText: "Ambientes virtuais" });
    await expect(museum).toContainText("Unity · C#");
    await expect(museum.locator("a")).toHaveAttribute(
      "href",
      "https://github.com/rafaeldominguesdev/semana-da-arte-moderna",
    );
    const kord = page
      .locator(".skill-row")
      .filter({ hasText: "Identidade visual na web" });
    await expect(kord).toContainText("HTML · CSS · JavaScript · GSAP");
    await expect(kord.locator("a")).toHaveAttribute(
      "href",
      "https://github.com/brunoproencadev/kordvisualidentity",
    );
  });
}
