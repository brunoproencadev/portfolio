import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const recovery of ["retry", "home"] as const) {
  test(`failed server navigation offers safe keyboard recovery via ${recovery}`, async ({
    page,
  }) => {
    await page.goto("/projetos/robosense-lab");
    await page.route("**/projetos/industry-week-senai?*", async (route) => {
      if (route.request().headers().rsc !== "1") return route.continue();
      const response = await route.fetch();
      const lines = (await response.text()).split("\n");
      const index = lines.findIndex((line) =>
        line.includes('"className":"case-intro"'),
      );
      expect(index).toBeGreaterThanOrEqual(0);
      const id = lines[index].split(":")[0];
      lines[index] =
        `${id}:E{"digest":"test-error","message":"PRIVATE_TEST_DETAIL"}`;
      await route.fulfill({ response, body: lines.join("\n") });
    });
    await page
      .getByRole("navigation", { name: "Outros cases" })
      .getByRole("link", { name: "Industry Week SENAI" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Vamos tentar novamente?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Vamos tentar novamente?" }),
    ).toBeFocused();
    await expect(page.getByRole("main")).not.toContainText(
      "PRIVATE_TEST_DETAIL",
    );
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    if (recovery === "retry") {
      await page.unrouteAll({ behavior: "wait" });
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: "Tentar novamente", exact: true }),
      ).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(
        page.getByRole("heading", { level: 1, name: "Industry Week SENAI" }),
      ).toBeVisible();
      await page.getByRole("link", { name: "Bruno Proença — início" }).click();
    } else {
      await page.getByRole("link", { name: "Voltar ao início" }).focus();
      await page.keyboard.press("Enter");
    }
    await expect(page.locator("#inicio")).toBeVisible();
  });
}
