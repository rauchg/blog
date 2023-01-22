"use client";

import { useMemo, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useQuery } from "@/convex/_generated/react";
import clientConfig from "@/convex/_generated/clientConfig";
import Link from "next/link";
import type { View } from "@/convex/getAllViews";
import { Suspense } from "react";

const convexClient = new ConvexReactClient(clientConfig);

interface Post {
  id: string;
  date: string;
  slug: string;
  title: string;
  views?: number;
  viewsFormatted?: string;
}

interface YearIndex {
  [key: string]: Post[];
}

export function Posts({ posts, views }) {
  const [sort, setSort] = useState(["date", "desc"]);

  function sortDate() {
    setSort(sort => [
      "date",
      sort[0] !== "date" || sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  function sortViews() {
    setSort(sort => [
      sort[0] === "views" && sort[1] === "asc" ? "date" : "views",
      sort[0] !== "views" ? "desc" : sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  return (
    <ConvexProvider client={convexClient}>
      <Suspense fallback={null}>
        <main className="max-w-2xl font-mono m-auto text-sm">
          <header className="text-gray-400 dark:text-gray-600 mb-2 flex text-xs">
            <button
              onClick={sortDate}
              className={`w-14 text-left  ${
                sort[0] === "date" && sort[1] !== "desc"
                  ? "text-gray-500 dark:text-gray-400"
                  : ""
              }`}
            >
              date
              {sort[0] === "date" && sort[1] === "asc" && "↑"}
            </button>
            <span className="grow">title</span>
            <button
              onClick={sortViews}
              className={
                sort[0] === "views" ? "text-gray-500 dark:text-gray-400" : ""
              }
            >
              views
              {sort[0] === "views" ? (sort[1] === "asc" ? "↑" : "↓") : ""}
            </button>
          </header>

          <List posts={posts} views={views} sort={sort} />
        </main>
      </Suspense>
    </ConvexProvider>
  );
}

function List({ posts, views, sort }) {
  const realtimeViews = useQuery("getAllViews");

  const viewsById = useMemo(() => {
    return (realtimeViews ?? views).reduce((acc: object, view: View) => {
      acc[view.postId] = view;
      return acc;
    }, {});
  }, [views, realtimeViews]);

  const postsWithViews = useMemo(() => {
    return posts.map((post: Post) => ({
      ...post,
      views: viewsById[post.id]?.views ?? 0,
      viewsFormatted: viewsById[post.id].viewsFormatted ?? "0",
    }));
  }, [posts, viewsById]);

  const sortedPosts = useMemo(() => {
    const [key, order] = sort;

    const sorted = [...postsWithViews].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      if (key === "date") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal > bVal) return order === "asc" ? 1 : -1;
      if (aVal < bVal) return order === "asc" ? -1 : 1;

      return 0;
    });

    return sorted;
  }, [postsWithViews, sort]);

  const postsByYear = useMemo(() => {
    return postsWithViews.reduce((acc: YearIndex, post: Post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    }, {});
  }, [postsWithViews]);

  // get the years keys
  const years: string[] = useMemo(() => {
    // return all years excluding duplicates
    return sortedPosts.reduce((acc, post: Post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc.includes(year)) acc.push(year);
      return acc;
    }, []);
  }, [sortedPosts]);

  return (
    <ul>
      {years.map(year => (
        <li key={year}>
          <ul>
            {postsByYear[year].map((post: Post, i: number) => (
              <li key={post.id}>
                <Link href={`/post`}>
                  <span
                    className={`py-3 flex items-center border-y border-gray-200 dark:border-[#313131] transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222]
                      ${i > 0 ? "pl-14 border-t-0" : ""}
                      ${
                        i === postsByYear[year].length - 1 ? "border-b-0" : ""
                      }`}
                  >
                    {i === 0 && (
                      <span className="w-14 inline-block self-start shrink-0 text-gray-400 dark:text-gray-500">
                        {year}
                      </span>
                    )}

                    <span className="grow dark:text-gray-200">
                      {post.title}
                    </span>

                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                      {post.viewsFormatted}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
