import { Redis } from "@upstash/redis";
import { Tweet } from "react-tweet/api";

// shape of the HSET in redis
type Views = {
  [key: string]: string;
};

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  if (redis) return redis;

  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  return redis;
}

export async function incrView(id: string) {
  const redis = getRedis();
  if (!redis) return 0;

  return redis.hincrby("views", id, 1);
}

export async function getPageViews(id: string) {
  const redis = getRedis();
  if (!redis) return 0;

  return (await redis.hget("views", id)) ?? 0;
}

export async function getViews(): Promise<null | Views> {
  const redis = getRedis();
  if (!redis) return null;

  return redis.hgetall("views");
}

export async function getTweet(id: string): Promise<null | Tweet> {
  const redis = getRedis();
  if (!redis) return null;

  return redis.get(`tweet:${id}`);
}

export async function setTweet(id: string, tweet: Tweet) {
  const redis = getRedis();
  if (!redis) return;

  await redis.set(`tweet:${id}`, tweet);
}
