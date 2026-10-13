import { expect, test, type Page } from "@playwright/test";

async function startFrozen(page: Page) {
  const now = new Date();
  await page.clock.install({ time: now });
  await page.clock.pauseAt(now);
  await page.goto("/");
  await expect(page.locator(".intro-curtain")).toBeVisible();
  await page.clock.runFor(32);
}

async function expectReleased(page: Page) {
  await expect(page.locator(".intro-curtain")).toBeHidden();
  await expect(page.getByRole("button", { name: "Pular intro" })).toBeHidden();
  await expect(page.locator(".hero-arc")).not.toHaveAttribute(
    "style",
    /transform/,
  );
  await expect(page.locator(".hero-actions")).toHaveCSS("opacity", "1");
  await expect(page.locator("#inicio")).toBeVisible();
}

test("handwriting advances one stroke at a time, pauses, and lifts to reveal the hero", async ({
  page,
}) => {
  await startFrozen(page);
  const curtain = page.locator(".intro-curtain");
  await expect(curtain).toHaveAttribute("aria-hidden", "true");
  await expect(curtain).toHaveCSS("pointer-events", "none");
  const offsets = () =>
    page
      .locator(".intro-stroke")
      .evaluateAll((paths) =>
        paths.map((p) => Number(p.getAttribute("stroke-dashoffset"))),
      );
  const first = await offsets();
  expect(first[0]).toBeGreaterThan(0);
  expect(first[0]).toBeLessThan(1);
  expect(first.slice(1)).toEqual([1, 1, 1]);
  await page.clock.runFor(500);
  const middle = await offsets();
  expect(middle.filter((v) => v > 0 && v < 1)).toHaveLength(1);
  expect(middle[0]).toBe(0);
  await page.clock.runFor(400);
  expect(await offsets()).toEqual([0, 0, 0, 0]);
  await expect(page.locator(".intro-greeting")).toHaveCSS("opacity", "1");
  expect((await curtain.boundingBox())!.y).toBe(0);
  await page.clock.runFor(300);
  const box = (await curtain.boundingBox())!;
  expect(box.y).toBeLessThan(0);
  expect(box.y + box.height).toBeGreaterThan(0);
  expect(box.y + box.height).toBeLessThan(page.viewportSize()!.height);
  await expect(page.locator(".intro-greeting")).toHaveCSS("opacity", "0");
  await page.clock.runFor(700);
  await expectReleased(page);
  await expect(curtain).not.toHaveAttribute("style", /transform/);
  expect(await offsets()).toEqual([0, 0, 0, 0]);
});

for (const stage of [400, 1200]) {
  for (const action of [
    "wheel",
    "touch",
    "hash",
    "pagehide",
    "pointer",
    "navigation focus",
    "reduced",
  ] as const) {
    test(`${action} cancels the curtain at ${stage}ms without a late replay`, async ({
      page,
    }) => {
      await startFrozen(page);
      await page.clock.runFor(stage - 32);
      if (action === "wheel") await page.mouse.wheel(0, 100);
      else if (action === "touch")
        await page.evaluate(() => dispatchEvent(new Event("touchstart")));
      else if (action === "hash")
        await page.evaluate(() => {
          location.hash = "projetos";
        });
      else if (action === "pagehide")
        await page.evaluate(() =>
          dispatchEvent(new PageTransitionEvent("pagehide")),
        );
      else if (action === "pointer") await page.mouse.click(8, 200);
      else if (action === "navigation focus")
        await page.getByRole("button", { name: "Menu", exact: true }).focus();
      else await page.emulateMedia({ reducedMotion: "reduce" });
      await expectReleased(page);
      if (action === "navigation focus")
        await expect(
          page.getByRole("button", { name: "Menu", exact: true }),
        ).toBeFocused();
      await page.clock.runFor(2500);
      await expectReleased(page);
    });
  }
}

test("watchdog removes a stalled timeline independently of animation frames", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.requestAnimationFrame = () => 0;
    window.cancelAnimationFrame = () => {};
  });
  await startFrozen(page);
  await page.clock.runFor(2200);
  await expectReleased(page);
});

test("server markup leaves the greeting hidden with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".intro-curtain")).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Pular intro" }),
    ).toBeHidden();
    await page
      .getByRole("link", { name: "Explorar projetos", exact: true })
      .click();
    await expect(page).toHaveURL(/#projetos$/);
  } finally {
    await context.close();
  }
});
