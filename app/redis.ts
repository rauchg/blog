import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://global-apt-bear-30602.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
