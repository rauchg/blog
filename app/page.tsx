import postsData from "@/posts.json";
import convexConfig from "@/convex.json";
import Posts, { Post } from "./posts";

export const revalidate = 30;

interface ConvexView {
  postId: string;
  views: number;
  viewsFormatted: string;
}

interface Views {
  [key: string]: {
    views: number;
    viewsFormatted: string;
  };
}

const getViews = async () => {
  const url = new URL(`${convexConfig.prodUrl}/api/0.1.4/udf`);
  url.searchParams.append("path", "getAllViews");
  url.searchParams.append("args", "[]");
  const res = await fetch(url);
  const values = await res.json().then(data => data.value);
  return values.reduce((acc: Views, cur: ConvexView) => {
    const { postId, views, viewsFormatted } = cur;
    acc[postId] = { views, viewsFormatted };
    return acc;
  }, {});
};

// aggregate posts by year and compute slug

export default async function Home() {
  const views = await getViews();
  const posts = postsData.posts.map((post: Post) => {
    const year = new Date(post.date).getFullYear();
    const slug = `${year}-${post.id}`;
    return {
      ...post,
      slug,
      ...views[slug],
    };
  });
  return <Posts posts={posts} />;
}
