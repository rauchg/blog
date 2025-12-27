import { Redis } from "@upstash/redis";

const redis =
  process.env.SKIP_VIEWS === "1" || !process.env.UPSTASH_REDIS_REST_TOKEN
    ? null
    : new Redis({
        url: "https://global-apt-bear-30602.upstash.io",
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });

export default redis;
