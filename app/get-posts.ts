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

export const getPosts = async () => {
  // If Redis/KV is not configured, return posts with mock view counts
  if (!redis) {
    const posts = postsData.posts.map((post): Post => {
      // Generate consistent mock views based on post ID (so they don't change on each request)
      const mockViews = post.id.charCodeAt(0) + post.id.charCodeAt(1) || 42;
      return {
        ...post,
        views: mockViews,
        viewsFormatted: commaNumber(mockViews),
      };
    });
    return posts;
  }

  // Real Redis/KV view tracking
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
};
