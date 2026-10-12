import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium, expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
}

for (const width of [320, 375, 768, 1440]) {
  test(`home and open capsule fit ${width}px with accessible targets`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(page.locator(".capsule")).not.toHaveAttribute(
      "data-animating",
    );
    await expectNoOverflow(page);
    expect(
      await page.locator(".notebook-orbit").evaluate((element) => {
        const frame = element.getBoundingClientRect();
        return [...element.querySelectorAll(".orbit-ring")].every((ring) => {
          const bounds = ring.getBoundingClientRect();
          return (
            bounds.top >= frame.top - 1 && bounds.bottom <= frame.bottom + 1
          );
        });
      }),
    ).toBe(true);
    expect(
      await page.locator("a, button").evaluateAll((elements) =>
        elements
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.width > 0 &&
              rect.height > 0 &&
              (rect.width < 44 || rect.height < 44)
            );
          })
          .map((element) => element.textContent?.trim()),
      ),
    ).toEqual([]);
    await expect(page.locator(".capsule-link-current:visible")).toHaveText(
      "Atual",
    );
    await expect(page.locator(".capsule-links [aria-current]")).toHaveCount(1);
    if (width === 320)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`menu-open-${width}.png`),
    });
    await page.getByRole("button", { name: "Fechar", exact: true }).click();
    await expect(page.locator(".capsule")).not.toHaveAttribute(
      "data-animating",
    );
    await page.screenshot({
      path: testInfo.outputPath(`home-full-${width}.png`),
      fullPage: true,
    });
    if (width === 375 || width === 1440) {
      await page
        .getByRole("region", { name: "Ideias em construção." })
        .screenshot({ path: testInfo.outputPath(`projects-${width}.png`) });
      await page
        .getByRole("region", {
          name: "Vamos conversar sobre o próximo desafio.",
        })
        .screenshot({ path: testInfo.outputPath(`contact-${width}.png`) });
    }
  });
}

test("panel survives resizing and scrolls in short landscape viewports", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  for (const viewport of [
    { width: 320, height: 640 },
    { width: 812, height: 375 },
  ]) {
    await page.setViewportSize(viewport);
    await expectNoOverflow(page);
    const contact = page
      .getByRole("navigation")
      .getByRole("link", { name: "Contato", exact: true });
    await contact.focus();
    await expect(contact).toBeInViewport({ ratio: 1 });
    const bounds = await page.getByRole("navigation").boundingBox();
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
  }
});

test("reduced motion updates immediately and keyboard focus stays visible", async ({
  page,
  browserName,
}, testInfo) => {
  test.skip(
    browserName === "webkit" && process.platform === "win32",
    "Windows WebKit skips native links on Tab even in plain HTML; see docs/QA_PHASE7.md.",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const button = page.getByRole("button", { name: "Menu", exact: true });
  await button.focus();
  expect(
    await button.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).toBe("solid");
  expect(
    await button.evaluate((element) => getComputedStyle(element).outlineWidth),
  ).toBe("3px");
  await page.screenshot({ path: testInfo.outputPath("keyboard-focus.png") });
  await button.click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .getByRole("button", { name: "Fechar", exact: true })
        .evaluate((element) => getComputedStyle(element).transitionDuration),
    )
    .toBe("0s");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contato", exact: true })
    .click();
  await expect(page.locator("#contato")).toBeFocused();
});

test("real Chromium zoom at 200 percent keeps navigation and content usable", async ({
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== "chromium",
    "Native zoom uses a Chromium extension.",
  );
  const extensionPath = testInfo.outputPath("zoom-extension");
  await mkdir(extensionPath, { recursive: true });
  await writeFile(
    join(extensionPath, "manifest.json"),
    JSON.stringify({
      manifest_version: 3,
      name: "Local zoom QA",
      version: "1.0",
      permissions: ["tabs"],
      background: { service_worker: "worker.js" },
    }),
  );
  await writeFile(
    join(extensionPath, "worker.js"),
    "chrome.runtime.onInstalled.addListener(() => {});",
  );
  const context = await chromium.launchPersistentContext(
    testInfo.outputPath("zoom-profile"),
    {
      channel: "chromium",
      headless: true,
      viewport: null,
      args: [
        "--window-size=1440,900",
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    },
  );
  try {
    const worker =
      context.serviceWorkers()[0] ??
      (await context.waitForEvent("serviceworker"));
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/");
    const initialWidth = await page.evaluate(() => innerWidth);
    const zoom = await worker.evaluate(`(async () => {
      const tabs = await chrome.tabs.query({});
      const tab = tabs.find((tab) => tab.url?.startsWith("http://127.0.0.1:3100/"));
      if (!tab?.id) throw new Error("Local QA tab missing");
      await chrome.tabs.setZoom(tab.id, 2);
      return chrome.tabs.getZoom(tab.id);
    })()`);
    expect(zoom).toBe(2);
    await expect
      .poll(() => page.evaluate(() => innerWidth))
      .toBe(Math.round(initialWidth / 2));
    await expectNoOverflow(page);
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Contato", exact: true })
      .click();
    await expect(page.locator("#contato")).toBeFocused();
    await expect(
      page
        .getByRole("region", {
          name: "Vamos conversar sobre o próximo desafio.",
        })
        .getByRole("link", { name: "E-mail" }),
    ).toBeInViewport();
    // Native zoom needs surface pixels rather than Playwright's CSS-pixel crop.
    const session = await context.newCDPSession(page);
    const capture = async (name: string) => {
      const screenshot = await session.send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });
      await writeFile(
        testInfo.outputPath(name),
        Buffer.from(screenshot.data, "base64"),
      );
    };
    await capture("zoom-200-contact.png");
    await page.goto("http://127.0.0.1:3100/");
    await capture("zoom-200-home.png");
  } finally {
    await context.close();
  }
});
