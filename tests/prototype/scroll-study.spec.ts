import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const route = "/experimentos/hero-projeto";
const scene = "[data-scroll-study]";
const media = `${scene} figure img`;

test("falha do módulo de animação mantém a leitura e a navegação", async ({
  page,
}) => {
  let blocked = 0;
  await page.route(/gsap.*\.js/, (request) => {
    blocked++;
    return request.abort();
  });
  await ready(page);
  await expect.poll(() => blocked).toBeGreaterThan(0);
  await expect(page.locator(`${scene} figure`)).toHaveCSS("position", "static");
  await page.getByRole("link", { name: "Explorar projetos" }).click();
  await expect(page.locator("#projetos")).toBeInViewport();
});

async function ready(page: Page) {
  await page.goto(route);
  await page.locator(media).evaluate(async (image: HTMLImageElement) => {
    await image.decode();
    await document.fonts.ready;
  });
}

async function enhanced(page: Page) {
  await expect
    .poll(() => page.locator(scene).evaluate((el) => el.clientHeight))
    .toBe(2160);
}

async function progress(page: Page, value: number) {
  await page.locator(scene).evaluate((el, p) => {
    const start = el.getBoundingClientRect().top + scrollY;
    scrollTo({
      top: start + (el.clientHeight - innerHeight) * p,
      behavior: "instant",
    });
  }, value);
  await page.waitForTimeout(650);
}

test("a mesma cena aproxima a mídia inteira e reconstrói o hero ao voltar", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await ready(page);
  await enhanced(page);
  const states = [];
  for (const p of [0, 0.25, 0.5, 0.75, 1]) {
    await progress(page, p);
    const bounds = await page.locator(media).boundingBox();
    expect(bounds).not.toBeNull();
    states.push({ progress: p, ...bounds });
    await page.screenshot({ path: info.outputPath(`forward-${p}.png`) });
  }
  expect(states[2].width!).toBeGreaterThan(states[1].width!);
  const final = states[4];
  expect(final.y).toBeGreaterThan(112);
  expect(final.y! + final.height!).toBeLessThan(840);
  expect(final.width! / final.height!).toBeCloseTo(16 / 9, 2);
  await expect(page.locator(`${scene} .hero-content`)).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator(`${scene} figcaption`)).toHaveCSS("opacity", "1");
  for (const p of [0.75, 0.5, 0.25, 0]) await progress(page, p);
  await expect(page.locator(`${scene} .hero-content`)).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(`${scene} figure`)).toHaveCSS("opacity", "0");
  expect(errors).toEqual([]);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await info.attach("geometry.json", {
    body: JSON.stringify(states, null, 2),
    contentType: "application/json",
  });
});

test("CTA, menu, foco, hash direto e scroll posterior continuam disponíveis", async ({
  page,
}) => {
  await ready(page);
  await enhanced(page);
  await page.getByRole("link", { name: "Explorar projetos" }).click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.locator("#projetos")).toBeInViewport();
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.getByRole("link", { name: "Início", exact: true }).click();
  await expect(page.locator("#inicio")).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await progress(page, 0.75);
  await expect(page.locator(`${scene} .hero-content`)).toHaveCSS(
    "opacity",
    "0",
  );
  await page.locator(".hero-secondary").focus();
  await expect(page.locator(`${scene} .hero-content`)).toHaveCSS(
    "opacity",
    "1",
  );
  await page.goto(`${route}#projetos`);
  await enhanced(page);
  await expect(page.locator("#projetos")).toBeInViewport();
  await page.goto(`${route}#contato`);
  await expect(page.locator("#contato")).toBeInViewport();
});

test("reduced motion e resize em execução devolvem o conteúdo ao fluxo", async ({
  page,
}) => {
  await ready(page);
  await enhanced(page);
  await progress(page, 0.5);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(`${scene} figure`)).toHaveCSS("position", "static");
  await expect(page.locator(`${scene} .hero-content`)).toHaveCSS(
    "transform",
    "none",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await enhanced(page);
  await page.setViewportSize({ width: 1920, height: 600 });
  await expect(page.locator(`${scene} figure`)).toHaveCSS("position", "static");
  await page.setViewportSize({ width: 1440, height: 900 });
  await enhanced(page);
});

test("mobile, viewport amplo e baixo e zoom equivalente não recortam conteúdo", async ({
  page,
}, info) => {
  for (const [width, height] of [
    [320, 812],
    [375, 812],
    [768, 812],
    [1920, 600],
    [1920, 700],
    [720, 450],
  ]) {
    await page.setViewportSize({ width, height });
    await ready(page);
    await expect(page.locator(`${scene} figure`)).toHaveCSS(
      "position",
      "static",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator(media).scrollIntoViewIfNeeded();
    const bounds = await page.locator(media).boundingBox();
    expect(bounds!.width / bounds!.height).toBeCloseTo(16 / 9, 2);
    if (width === 375) {
      await page.screenshot({ path: info.outputPath("mobile-375.png") });
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    }
  }
});

test("sem JavaScript, o projeto e os destinos permanecem legíveis", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:3102${route}`);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Bruno");
  await expect(page.locator(`${scene} figure`)).toHaveCSS("position", "static");
  await page.getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(page.locator("#projetos")).toBeInViewport();
  await context.close();
});
