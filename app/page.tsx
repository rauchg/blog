import { Posts } from "./posts";
import { getPosts } from "./get-posts";

export default async function Home() {
  const posts = await getPosts();
  return <Posts posts={posts} />;
}
