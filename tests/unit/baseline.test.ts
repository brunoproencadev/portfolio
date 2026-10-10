import { expect, test } from "vitest";
import config from "../../next.config";
test("production does not advertise framework and sets security headers", async () => {
  expect(config.poweredByHeader).toBe(false);
  const headers = await config.headers?.();
  expect(headers?.[0].headers).toContainEqual({
    key: "X-Content-Type-Options",
    value: "nosniff",
  });
});
