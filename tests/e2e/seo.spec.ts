import { expect, test } from "@playwright/test";

const paths = [
  "/",
  "/projetos/robosense-lab",
  "/projetos/industry-week-senai",
  "/projetos/atelie-ingrid-xavier",
];
const indexable =
  process.env.SITE_INDEXABLE === "true" && process.env.VERCEL_ENV !== "preview";

test("metadata, crawler policy and sitemap agree across all public routes", async ({
  page,
  request,
}) => {
  for (const path of paths) {
    await page.goto(path);
    const title = await page.title();
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      title,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute(
      "content",
      (await page
        .locator('meta[name="description"]')
        .getAttribute("content")) as string,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      indexable ? "index, follow" : "noindex, nofollow",
    );
    if (process.env.SITE_URL) {
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      const ogUrl = await page
        .locator('meta[property="og:url"]')
        .getAttribute("content");
      expect(new URL(canonical!).href).toBe(
        new URL(path, process.env.SITE_URL).href,
      );
      expect(new URL(ogUrl!).href).toBe(
        new URL(path, process.env.SITE_URL).href,
      );
    } else {
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    }
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /\/opengraph-image/,
    );
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(indexable ? "Allow: /" : "Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  const xml = await sitemap.text();
  expect((xml.match(/<loc>/g) ?? []).length).toBe(indexable ? 4 : 0);
  if (indexable)
    for (const path of paths)
      expect(xml).toContain(new URL(path, process.env.SITE_URL).href);
});

test("native metadata assets have the expected formats and dimensions", async ({
  page,
  request,
}) => {
  for (const path of paths) {
    await page.goto(path);
    await expect(
      page.locator('link[rel="icon"][type="image/x-icon"]'),
    ).toHaveAttribute("href", /^\/favicon\.ico\?/);
    await expect(
      page.locator('link[rel="icon"][type="image/png"]'),
    ).toHaveAttribute("href", /^\/icon\.png\?/);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
      "href",
      /^\/apple-icon\.png\?/,
    );
  }
  const icon = await request.get("/favicon.ico");
  expect(icon.status()).toBe(200);
  expect(icon.headers()["content-type"]).toMatch(
    /image\/(x-icon|vnd.microsoft.icon)/,
  );
  const ico = await icon.body();
  expect(ico.readUInt16LE(2)).toBe(1);
  expect(ico.readUInt16LE(4)).toBe(3);
  expect([0, 1, 2].map((index) => ico[6 + index * 16])).toEqual([16, 32, 48]);
  for (const [path, width, height] of [
    ["/opengraph-image", 1200, 630],
    ["/icon.png", 192, 192],
    ["/apple-icon.png", 180, 180],
  ] as const) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const png = await response.body();
    expect(png.readUInt32BE(16)).toBe(width);
    expect(png.readUInt32BE(20)).toBe(height);
  }
});
