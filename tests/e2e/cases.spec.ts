import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { projects } from "../../src/data/portfolio";

for (const project of projects) {
  for (const width of [320, 375, 768, 1440]) {
    test(`${project.slug} renders a complete accessible case at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(`/projetos/${project.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(`${project.name} | Bruno Proença Silva`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      await expect(
        page.getByRole("heading", { level: 1, name: project.name }),
      ).toBeVisible();
      for (const name of [
        "O problema",
        "Como foi construído",
        "Escolhas e desafios",
        "O que sustenta o case",
        "Até onde foi validado",
        "A próxima decisão",
      ])
        await expect(
          page.getByRole("heading", { name, exact: true }),
        ).toBeVisible();
      await expect(page.getByRole("img")).toHaveAccessibleName(
        /Diagrama conceitual/,
      );
      await expect(page.getByRole("img")).toHaveAttribute("width", "480");
      await expect(page.getByRole("img")).toHaveAttribute("height", "260");
      await expect(page.locator("figcaption")).toContainText(
        "Esquema conceitual autoral",
      );
      await expect(
        page.getByRole("link", { name: "Ver repositório" }),
      ).toHaveAttribute("href", project.repository);
      await expect(
        page.getByRole("link", { name: "Conversar por e-mail" }),
      ).toHaveAttribute("href", /^mailto:/);
      for (const link of await page.locator(".case-sources a").all())
        await expect(link).toHaveAttribute("href", /\/blob\/[a-f0-9]{40}\//);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await page.locator("a, button").evaluateAll((elements) =>
          elements
            .filter((element) => {
              const bounds = element.getBoundingClientRect();
              return (
                bounds.width > 0 &&
                bounds.height > 0 &&
                (bounds.width < 44 || bounds.height < 44)
              );
            })
            .map((element) => element.textContent),
        ),
      ).toEqual([]);
      if (width === 320 || width === 1440)
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
      if (width === 375 || width === 1440)
        await page.screenshot({
          path: testInfo.outputPath(`${project.slug}-${width}.png`),
          fullPage: true,
        });
      expect(errors).toEqual([]);
    });
  }
}

test("cases and navigation remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await page.getByRole("link", { name: "Ler case de RoboSense Lab" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: "RoboSense Lab" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Outros cases" })
      .getByRole("link", { name: "Industry Week SENAI" })
      .click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Industry Week SENAI" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Outros cases" })
      .getByRole("link", { name: "Ateliê Ingrid Xavier" })
      .click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Ateliê Ingrid Xavier" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Contato", exact: true }).click();
    await expect(page).toHaveURL(/\/#contato$/);
    await expect(page.locator("#contato")).toBeInViewport();
  } finally {
    await context.close();
  }
});

test("unknown slugs and inherited names return useful HTTP 404 pages", async ({
  page,
}) => {
  for (const path of [
    "/pagina-inexistente",
    "/projetos/desconhecido",
    "/projetos/__proto__",
    "/projetos/constructor",
    "/projetos/toString",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Esse caminho ainda não existe." }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Explorar projetos" }),
    ).toHaveAttribute("href", "/#projetos");
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("link", { name: "Voltar ao início" }).click();
  await expect(page.locator("#inicio")).toBeVisible();
});

test("client navigation discards home motion and does not replay the intro", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const listeners = new Set<EventListenerOrEventListenerObject>();
    const add = EventTarget.prototype.addEventListener;
    const remove = EventTarget.prototype.removeEventListener;
    Object.defineProperty(window, "motionListenerCount", {
      get: () => listeners.size,
    });
    EventTarget.prototype.addEventListener = function (
      type,
      listener,
      options,
    ) {
      if (
        this instanceof MediaQueryList &&
        this.media === "(prefers-reduced-motion: reduce)" &&
        type === "change" &&
        listener
      )
        listeners.add(listener);
      return add.call(this, type, listener, options);
    };
    EventTarget.prototype.removeEventListener = function (
      type,
      listener,
      options,
    ) {
      if (
        this instanceof MediaQueryList &&
        this.media === "(prefers-reduced-motion: reduce)" &&
        type === "change" &&
        listener
      )
        listeners.delete(listener);
      return remove.call(this, type, listener, options);
    };
  });
  await page.goto("/");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as Window & { motionListenerCount: number })
            .motionListenerCount,
      ),
    )
    .toBeGreaterThan(0);
  await page
    .getByRole("link", { name: "Ler case de RoboSense Lab" })
    .evaluate((element: HTMLAnchorElement) => element.click());
  await expect(page).toHaveURL(/\/projetos\/robosense-lab$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "RoboSense Lab" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as Window & { motionListenerCount: number })
            .motionListenerCount,
      ),
    )
    .toBe(0);
  await page
    .getByRole("navigation", { name: "Outros cases" })
    .getByRole("link", { name: "Industry Week SENAI" })
    .click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Industry Week SENAI" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Bruno Proença — início" }).click();
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".orbit-center")).not.toHaveAttribute(
    "style",
    /transform/,
  );
});
