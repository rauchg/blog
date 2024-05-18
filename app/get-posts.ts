import postsData from "./posts.json";
import { getViews } from "./redis";
import commaNumber from "comma-number";

export type Post = {
  id: string;
  date: string;
  title: string;
  views: number;
  viewsFormatted: string;
};

export const getPosts = async () => {
  const allViews = await getViews();
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
