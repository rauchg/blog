// This file supports both Upstash Redis and Vercel KV
// Vercel KV is just Upstash Redis under the hood, so the same code works!

import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

// Check for Vercel KV (auto-configured) or manual Upstash token
if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  // Vercel KV environment variables
  redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
  console.log("✅ Connected to Vercel KV for view tracking");
} else if (process.env.UPSTASH_REDIS_REST_TOKEN) {
  // Manual Upstash configuration
  redis = new Redis({
    url: "https://global-apt-bear-30602.upstash.io",
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  console.log("✅ Connected to Upstash Redis for view tracking");
} else {
  console.warn("⚠️ No Redis/KV configured - view counting disabled. Add Vercel KV from the Storage tab in your project dashboard.");
}

export default redis;
