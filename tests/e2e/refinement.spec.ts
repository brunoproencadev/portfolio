import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-intro-seen", "true"),
  );
  await page.goto("/");
  await expect(page.locator(".story-enhanced")).toHaveCount(1);
});

test("content order, consolidated details, tool icons and contact match the requested composition", async ({
  page,
}) => {
  const ids = await page
    .locator("main h2")
    .evaluateAll((headings) => headings.map((h) => h.id));
  expect(ids.indexOf("sobre")).toBeLessThan(ids.indexOf("projetos"));
  await expect(page.locator(".capsule-links a")).toHaveText([
    "InícioAtual",
    "SobreAtual",
    "ProjetosAtual",
    "CompetênciasAtual",
    "ContatoAtual",
  ]);
  await expect(page.locator("main a[href^='/projetos/']")).toHaveCount(3);
  for (const band of await page.locator(".story-band").all()) {
    await band.locator("h3").focus();
    await expect(band.locator(".work-evidence")).toContainText("Fonte");
    for (const tool of await band.locator("[data-project-tool]").all()) {
      expect(await tool.getAttribute("aria-label")).toBeTruthy();
      await expect(tool).toHaveText("");
      await expect(tool.locator("img")).toHaveJSProperty("complete", true);
      expect(
        await tool
          .locator("img")
          .evaluate((el) => (el as HTMLImageElement).naturalWidth),
      ).toBeGreaterThan(0);
    }
  }
  await expect(
    page.locator(".story-band:first-child [data-project-tool]"),
  ).toHaveCount(6);
  await expect(page.locator(".contact-actions > a")).toHaveText(
    "brunoproencasilva@gmail.com",
  );
  await expect(page.locator(".contact-links a")).toHaveText([
    "E-mail",
    "LinkedIn",
    "GitHub",
  ]);
  await expect(
    page.locator(".contact-links svg, .contact-links img"),
  ).toHaveCount(3);
});

test("keyboard focus brings each carousel link into view without removing its pin", async ({
  page,
}) => {
  for (const link of await page.locator(".story-band a").all()) {
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport({ ratio: 1 });
    const bounds = (await link.boundingBox())!;
    expect(bounds.y).toBeGreaterThanOrEqual(112);
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
  }
  await page.locator(".story-progress a").first().click();
  await expect(page.locator("#titulo-industry-week-senai")).toBeFocused();
  await expect(page.locator(".story-progress-thumb")).toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 0, 0)",
  );
});

test("hover opens navigation, smooth travel preserves the scene forwards and backwards", async ({
  page,
}) => {
  for (const [label, id] of [
    ["Contato", "contato"],
    ["Sobre", "sobre"],
    ["Início", "inicio"],
  ]) {
    await page.mouse.move(20, 200);
    await page.locator(".capsule").hover();
    await expect(page.locator(".capsule-toggle")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    const before = await page.evaluate(() => scrollY);
    await page
      .locator(".capsule-links")
      .getByRole("link", { name: label, exact: true })
      .click();
    await page.waitForTimeout(80);
    const during = await page.evaluate(() => scrollY);
    await expect(page.locator(".pin-spacer")).toHaveCount(1);
    await expect(page.locator(`#${id}`)).toBeFocused();
    const after = await page.evaluate(() => scrollY);
    expect(Math.abs(after - before)).toBeGreaterThan(100);
    expect(Math.abs(after - during)).toBeGreaterThan(50);
  }
  await page.locator(".capsule").hover();
  await expect(page.locator(".capsule-toggle")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".capsule-toggle")).toBeFocused();
  await expect(page.locator(".capsule-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("direct skills navigation starts at the first row and every paragraph remains readable", async ({
  page,
}) => {
  await page.goto("/#competencias");
  await page.reload();
  await expect(page.locator("#competencias")).toBeFocused();
  await expect(page.locator(".skills-section .section-heading")).toHaveCSS(
    "filter",
    "blur(0px)",
  );
  await expect(page.locator(".skills-section .section-heading")).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".skill-row").first()).toBeInViewport();
  for (const row of await page.locator(".skill-row").all()) {
    await row.evaluate((el) => el.scrollIntoView({ block: "center" }));
    for (const text of await row.locator("h3,p,a").all()) {
      await expect(text).toBeInViewport({ ratio: 1 });
      const state = await text.evaluate((el) => ({
        overflow: el.scrollWidth > el.clientWidth,
        opacity: getComputedStyle(el).opacity,
        filter: getComputedStyle(el).filter,
      }));
      expect(state).toEqual({ overflow: false, opacity: "1", filter: "none" });
    }
  }
});

test("ribbons repeat equal groups continuously, pause offscreen and respect the pause control", async ({
  page,
}) => {
  const passage = page.locator(".contact-passage");
  await expect(passage).toHaveAttribute("data-running", "false");
  await passage.scrollIntoViewIfNeeded();
  await expect(passage).toHaveAttribute("data-running", "true");
  const track = page.locator(".ribbon-track").first();
  const x = () =>
    track.evaluate(
      (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41,
    );
  const before = await x();
  await page.waitForTimeout(200);
  expect(Math.abs((await x()) - before)).toBeGreaterThan(1);
  const geometry = await track.evaluate((el) => {
    const [a, b] = Array.from(el.children) as HTMLElement[];
    return {
      first: a.offsetWidth,
      second: b.offsetWidth,
      gap: b.offsetLeft - a.offsetLeft - a.offsetWidth,
      track: (el as HTMLElement).offsetWidth,
    };
  });
  expect(geometry.first).toBe(geometry.second);
  expect(Math.abs(geometry.track - geometry.first * 2)).toBeLessThanOrEqual(1);
  expect(Math.abs(geometry.gap)).toBeLessThanOrEqual(1);
  await page.getByRole("button", { name: "Pausar faixas" }).click();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  const seam = await track.evaluate((el) => {
    const animation = el.getAnimations()[0];
    const duration = Number(animation.effect!.getTiming().duration);
    animation.currentTime = duration - 1;
    const end = el.children[1].getBoundingClientRect().left;
    animation.currentTime = duration + 1;
    return Math.abs(end - el.children[0].getBoundingClientRect().left);
  });
  expect(seam).toBeLessThan(1);
  await page.getByRole("button", { name: "Retomar faixas" }).click();
  await expect(track).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(
    page.getByRole("button", { name: "Pausar faixas" }),
  ).toBeHidden();
});

test("short desktops fall back to natural content height without clipped project text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 700 });
  await expect(page.locator(".story-enhanced")).toHaveCount(0);
  for (const band of await page.locator(".story-band").all()) {
    expect(
      await band.evaluate((el) => el.scrollHeight <= el.clientHeight),
    ).toBe(true);
  }
});
