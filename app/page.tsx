import { Posts } from "./posts";
import { getCachedPosts } from "./get-posts";

export default async function Home() {
  const posts = await getCachedPosts();
  return <Posts posts={posts} />;
}
