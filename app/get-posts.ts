import postsData from "./posts.json";
import redis from "./redis";
import commaNumber from "comma-number";

export type Post = {
  id: string;
  date: string;
  title: string;
  views: number;
  viewsFormatted: string;
};

// shape of the HSET in redis
type Views = {
  [key: string]: string;
};

/**
 * Fetches all blog posts with view counts from Redis.
 * This function is cached with a 300 second revalidation period.
 * Cache is tagged with "posts" for targeted revalidation.
 */
export async function getPosts() {
  "use cache";
  const allViews: null | Views = await redis.hgetall("views");
  const posts = postsData.posts.map((post): Post => {
    const views = Number(allViews?.[post.id] ?? 0);
    return {
      ...post,
      views,
      viewsFormatted: commaNumber(views),
    };
  });
  return posts;
}

// Cache configuration for getPosts
getPosts.cacheLife = {
  revalidate: 300,
};
getPosts.cacheTags = ["posts"];
