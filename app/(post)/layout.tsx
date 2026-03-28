import { Header } from "./header";
import { getPosts } from "../get-posts";
import { TriangleText } from "./triangle";

export const revalidate = 300;

export default async function Layout({ children }) {
  const posts = await getPosts();

  return (
    <>
      <div className="relative z-[60]">
        <Header posts={posts} />
      </div>

      <article
        data-post-content
        className="sr-only"
        aria-hidden="true"
      >
        {children}
      </article>

      <TriangleText />
    </>
  );
}
