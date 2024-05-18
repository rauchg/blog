import { defineConfig, devices } from "@playwright/test";
import {
  createReplayReporterConfig,
  devices as replayDevices,
} from "@replayio/playwright";

import dotenv from "dotenv";

dotenv.config();

// This is a temporary workaround so that replays in CI can be public by default.
// Should be fixed soon.
const replayReporterOptions = process.env.CI
  ? {}
  : {
      upload: true,
      apiKey: process.env.REPLAY_API_KEY,
    };

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  },

  reporter: [createReplayReporterConfig(replayReporterOptions), ["line"]],

  projects: [
    {
      name: "replay-chromium",
      use: { ...replayDevices["Replay Chromium"] },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
