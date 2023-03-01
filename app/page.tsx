import postsData from "@/posts.json";
import { Posts } from "./posts";
import { getViews } from "./get-views";

export const revalidate = 1;

export default async function Home() {
  const views = await getViews();
  const { posts } = postsData;

  return <Posts views={views} posts={posts} />;
}
