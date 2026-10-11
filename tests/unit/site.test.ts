import { expect, test } from "vitest";
import { publicationConfig } from "../../src/config/site";

test("preview defaults to no indexing and no invented canonical", () => {
  expect(publicationConfig({})).toEqual({ url: undefined, indexable: false });
});

test("indexing requires a validated public HTTPS origin", () => {
  for (const SITE_URL of [
    "http://example.com",
    "https://localhost",
    "https://127.0.0.1",
    "https://[::1]",
    "https://user:pass@example.com",
    "https://example.com/path",
    "https://example.com/?q=1",
    "https://example.com/#hash",
    "invalid",
  ]) {
    expect(() => publicationConfig({ SITE_URL })).toThrow();
  }
  expect(() => publicationConfig({ SITE_INDEXABLE: "true" })).toThrow();
  expect(() => publicationConfig({ SITE_INDEXABLE: "yes" })).toThrow();
  expect(
    publicationConfig({
      SITE_URL: "https://example.com",
      SITE_INDEXABLE: "true",
    }).indexable,
  ).toBe(true);
  expect(
    publicationConfig({
      SITE_URL: "https://example.com",
      SITE_INDEXABLE: "true",
      VERCEL_ENV: "preview",
    }).indexable,
  ).toBe(false);
});
