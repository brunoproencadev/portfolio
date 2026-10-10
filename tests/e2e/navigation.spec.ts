import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("disclosure follows keyboard order and Escape returns focus", async ({
  page,
}) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu", exact: true });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Fechar", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Início", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("button", { name: "Fechar", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("outside click and leaving focus close without stealing the new focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.getByRole("heading", { name: "Bruno Proença Silva" }).click();
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const contact = page
    .getByRole("navigation")
    .getByRole("link", { name: "Contato", exact: true });
  await contact.focus();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Explorar projetos" }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
});

for (const width of [375, 1440]) {
  test(`section selection, hash and context work at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (const [id, label] of [
      ["projetos", "Projetos"],
      ["sobre", "Sobre"],
      ["competencias", "Competências"],
      ["contato", "Contato"],
      ["inicio", "Início"],
    ]) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: label, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeFocused();
      await expect(page.locator(".capsule-current")).toHaveText(label);
      const bounds = await page.locator(`#${id}`).boundingBox();
      expect(bounds?.y).toBeGreaterThanOrEqual(96);
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(
        page
          .getByRole("navigation")
          .getByRole("link", { name: label, exact: true }),
      ).toHaveAttribute("aria-current", "location");
      await page.keyboard.press("Escape");
    }
    await page.goto("/#sobre");
    await expect(page.locator(".capsule-current")).toHaveText("Sobre");
    await page
      .locator("#competencias")
      .evaluate((element) => element.scrollIntoView({ block: "start" }));
    await expect(page.locator(".capsule-current")).toHaveText("Competências");
  });
}

test("navigation links remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("button")).toHaveCount(0);
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link")).toHaveCount(5);
    await nav.getByRole("link", { name: "Contato", exact: true }).click();
    await expect(page).toHaveURL(/#contato$/);
    await expect(page.locator("#contato")).toBeInViewport();
    await expect(
      page
        .getByRole("region", {
          name: "Vamos conversar sobre o próximo desafio.",
        })
        .getByRole("link", { name: "E-mail" }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});
