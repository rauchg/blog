import { Posts } from "./posts";
import { getPosts } from "./get-posts";

export const revalidate = 1;

export const metadata = {
  openGraph: {
    title: "Guillermo Rauchg's blog",
    description:
      "Guillermo Rauch is the CEO and founder of Vercel, a software engineer, and the creator of Next.js, Mongoose, Socket.io and other open source libraries.",
    url: "https://rauchg.com",
    siteName: "Guillermo Rauchg's blog",
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
