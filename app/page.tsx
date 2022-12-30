import postsData from "@/posts.json";
import convexConfig from "@/convex.json";
import Posts from "./posts";

export const revalidate = 1;

const getViews = async () => {
  const url = new URL(`${convexConfig.prodUrl}/api/0.1.4/udf`);
  url.searchParams.append("path", "getAllViews");
  url.searchParams.append("args", "[]");
  const res = await fetch(url);
  return res.json().then(data => data.value);
};

export default async function Home() {
  const views = await getViews();
  const { posts } = postsData;
  return <Posts views={views} posts={posts} />;
}
