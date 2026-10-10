import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("foundation serves semantic content without runtime errors", async ({
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
  await expect(
    page.getByRole("heading", { name: "Bruno Proen\u00e7a Silva", level: 1 }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
});
