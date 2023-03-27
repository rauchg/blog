import { Posts } from "./posts";
import { getPosts } from "./get-posts";

export const revalidate = 60;

export const metadata = {
  openGraph: {
    images: [
      {
        url: "/og/main",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Home() {
  const posts = await getPosts();
  return <Posts posts={posts} />;
}
