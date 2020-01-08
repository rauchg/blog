import { posts } from "../posts";
import getBlogIndex from "./notion/getBlogIndex";
import { getDateStr, getBlogLink } from "./blog-helpers";

export default async function getCombinedPosts() {
  const postsTable = await getBlogIndex(false);

  const notionPosts = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug];
      // remove draft posts in production
      if (process.env.NODE_ENV === "production" && post.Published !== "Yes") {
        return null;
      }
      return post;
    })
    .filter(Boolean);

  const combinedPosts = [
    ...notionPosts.map(post => ({
      date: getDateStr(post.Date),
      title: post.Page,
      id: post.Slug,
      notion: true,
      url: getBlogLink(post.Slug)
    })),
    ...posts.map(post => ({
      ...post,
      url: `${new Date(post.date).getFullYear()}/${post.id}`
    }))
  ];

  return combinedPosts;
}
