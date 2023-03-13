import postsData from "./posts.json";
import redis from "./redis";
import commaNumber from "comma-number";

type Views = {
  [key: string]: string;
};

export const getPosts = async () => {
  const allViews: null | Views = await redis.hgetall("views");
  const posts = postsData.posts.map(post => {
    const views = allViews?.[post.id] ?? 0;
    return {
      ...post,
      views,
      viewsFormatted: commaNumber(views),
    };
  });
  return posts;
};
