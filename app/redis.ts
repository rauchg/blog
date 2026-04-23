import { Redis } from "@upstash/redis";

const redis =
  process.env.SKIP_VIEWS === "1" || !process.env.KV_REST_API_TOKEN
    ? null
    : new Redis({
        url: process.env.KV_REST_API_URL!,
        token: process.env.KV_REST_API_TOKEN,
      });

export default redis;
