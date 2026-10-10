import { expect, test } from "@playwright/test";

for (const viewport of [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
]) {
  test(`identity and primary action fit the first fold at ${viewport.width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    for (const locator of [
      page.getByRole("heading", { name: "Bruno Proença Silva", level: 1 }),
      page.getByText("Desenvolvedor em formação", { exact: true }),
      page.getByText("Software, visão computacional e robótica.", {
        exact: true,
      }),
      page.getByRole("link", { name: "Explorar projetos" }),
    ]) {
      await expect(locator).toBeInViewport({ ratio: 1 });
    }
    await page.screenshot({
      path: testInfo.outputPath(`home-fold-${viewport.width}.png`),
    });
  });
}

test("projects show sources and limits and all internal links resolve", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of [
    "RoboSense Lab",
    "Industry Week SENAI",
    "Ateliê Ingrid Xavier",
  ]) {
    const card = page.getByRole("article", { name });
    await expect(card).toContainText("Estado");
    await expect(card).toContainText("Fonte");
    await expect(card).toContainText("Esquema conceitual");
    await expect(
      card.getByRole("link", { name: `Ver repositório de ${name}` }),
    ).toHaveAttribute("href", /^https:\/\/github\.com\/brunoproencadev\//);
  }
  expect(await page.locator('a[href^="/projetos/"]').count()).toBe(3);
  expect(
    await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')].every(
        (link) => document.getElementById(link.hash.slice(1)),
      ),
    ),
  ).toBe(true);
  const contact = page.getByRole("region", {
    name: "Vamos conversar sobre o próximo desafio.",
  });
  await expect(contact.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/brunoproencadev",
  );
  await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/brunoproencasilva",
  );
  await expect(contact.getByRole("link", { name: "E-mail" })).toHaveAttribute(
    "href",
    "mailto:brunoproencasilva@gmail.com",
  );
});
