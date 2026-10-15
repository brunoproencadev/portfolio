import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./prototype",
  outputDir: "../.audit/phase-f-prototype/tests",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  use: {
    baseURL: "http://127.0.0.1:3102",
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
    video: { mode: "on", size: { width: 1440, height: 900 } },
  },
  webServer: {
    command:
      "node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3102",
    url: "http://127.0.0.1:3102",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
