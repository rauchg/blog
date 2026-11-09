import { Header } from "./header";
import { getCachedPosts } from "../get-posts";

export default async function Layout({ children }) {
  const posts = await getCachedPosts();

  return (
    <article className="text-gray-800 dark:text-gray-300 mb-10">
      <Header posts={posts} />

      {children}
    </article>
  );
}
