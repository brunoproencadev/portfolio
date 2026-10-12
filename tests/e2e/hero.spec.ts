import { expect, test } from "@playwright/test";

test("hero keeps the name, actions and luminous edge separate at every size", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  for (const width of [320, 375, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width >= 900 ? 900 : 812 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.getByRole("heading", { level: 1, name: "Bruno Proença Silva" }),
    ).toHaveCount(1);
    const geometry = await page.evaluate(() => {
      const actions = document
        .querySelector(".hero-actions")!
        .getBoundingClientRect();
      const links = [...document.querySelectorAll(".hero-actions a")].map((a) =>
        a.getBoundingClientRect(),
      );
      const edge = document.querySelector<SVGPathElement>(".hero-arc-edge")!;
      const matrix = edge.getScreenCTM()!;
      const points = Array.from({ length: 201 }, (_, i) => {
        const p = edge.getPointAtLength((edge.getTotalLength() * i) / 200);
        return new DOMPoint(p.x, p.y).matrixTransform(matrix);
      }).filter(
        (p) =>
          p.x >= Math.min(...links.map((r) => r.left)) &&
          p.x <= Math.max(...links.map((r) => r.right)),
      );
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        actionsBottom: actions.bottom,
        edgeTop: Math.min(...points.map((p) => p.y)),
        linksFit: links.every(
          (r) => r.left >= 0 && r.right <= innerWidth && r.height >= 44,
        ),
        titleLines: [...document.querySelectorAll(".hero-title-line")].map(
          (t) => t.getBoundingClientRect().height,
        ),
      };
    });
    expect(geometry.overflow).toBe(false);
    expect(geometry.linksFit).toBe(true);
    expect(geometry.actionsBottom).toBeLessThan(geometry.edgeTop - 12);
    expect(geometry.titleLines).toHaveLength(2);
    await expect(
      page.getByRole("link", { name: "Explorar projetos", exact: true }),
    ).toBeInViewport();
  }
});

test("hero reveals title lines before support and actions, then restores static styles", async ({
  page,
}) => {
  const now = new Date();
  await page.clock.install({ time: now });
  await page.clock.pauseAt(now);
  await page.goto("/");
  const arc = page.locator(".hero-arc");
  await expect(arc).toHaveAttribute("style", /translate/);
  await page.clock.runFor(32);
  await expect(arc).toHaveAttribute("style", /transform/);
  await page.clock.runFor(300);
  const offsets = await page
    .locator(".hero-title-line")
    .evaluateAll((lines) =>
      lines.map(
        (line) => new DOMMatrixReadOnly(getComputedStyle(line).transform).m42,
      ),
    );
  expect(offsets[0]).toBeLessThan(offsets[1]);
  await expect(page.locator(".hero-actions")).toHaveCSS("opacity", "0");
  const edgeWidth = Number(
    await page.locator(".hero-arc-edge").getAttribute("stroke-width"),
  );
  expect(edgeWidth).toBeGreaterThan(2);
  expect(edgeWidth).toBeLessThan(12);
  await page.clock.runFor(450);
  const actionOpacity = Number(
    await page
      .locator(".hero-actions")
      .evaluate((e) => getComputedStyle(e).opacity),
  );
  expect(actionOpacity).toBeGreaterThan(0);
  expect(actionOpacity).toBeLessThan(1);
  await page.clock.runFor(450);
  await expect(arc).not.toHaveAttribute("style", /transform/);
  await expect(page.locator(".hero-arc-edge")).toHaveAttribute(
    "stroke-width",
    "2",
  );
  await expect(page.locator(".hero-actions")).toHaveCSS("opacity", "1");
});

test("font failure leaves readable identity and functional actions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/*.woff2", (route) => route.abort());
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bruno Proença Silva" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await page
    .getByRole("link", { name: "Explorar projetos", exact: true })
    .click();
  await expect(page).toHaveURL(/#projetos$/);
});
