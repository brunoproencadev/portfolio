import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("foundation serves accessible preview content without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response?.headers()["x-frame-options"]).toBe("DENY");
  expect(response?.headers()["x-powered-by"]).toBeUndefined();
  await expect(
    page.getByRole("heading", { name: "Bruno Proença Silva", level: 1 }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
});

test("server content remains available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bruno Proença Silva" }),
    ).toBeVisible();
    await expect(page.getByRole("main")).toContainText("robótica");
    await expect(page.locator(".wordmark")).toHaveAccessibleName(
      "BP/ — Bruno Proença — início",
    );
  } finally {
    await context.close();
  }
});

for (const width of [320, 375, 768, 1440]) {
  test(`foundation fits ${width}px with reduced motion`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue("--motion-fast")
          .trim(),
      ),
    ).toMatch(/^0(?:ms|s)$/);
    await page.screenshot({
      path: testInfo.outputPath(`foundation-${width}.png`),
    });
  });
}
