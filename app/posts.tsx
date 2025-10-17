"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import useSWR from "swr";

type SortSetting = ["date" | "views", "desc" | "asc"];

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Posts({ posts: initialPosts }) {
  const { data: posts } = useSWR("/api/posts", fetcher, {
    fallbackData: initialPosts,
    refreshInterval: 5000,
  });

  return (
    <Suspense fallback={null}>
      <main className="max-w-2xl m-auto mb-10 text-sm">
        <List posts={posts} />
      </main>
    </Suspense>
  );
}

function List({ posts }) {
  return (
    <ul>
      {posts.map((post, i: number) => {
        const year = getYear(post.date);
        const firstOfYear =
          !posts[i - 1] || getYear(posts[i - 1].date) !== year;
        const lastOfYear = !posts[i + 1] || getYear(posts[i + 1].date) !== year;

        return (
          <li key={post.id} className="group">
            <Link href={`/${new Date(post.date).getFullYear()}/${post.id}`}>
              <span
                className={`flex
                ${!firstOfYear ? "border-t-0" : ""}
                ${lastOfYear ? "border-b-0" : ""}
              `}
              >
                <span
                  className={`py-2 flex grow items-center ${
                    !firstOfYear ? "ml-10 md:ml-14" : ""
                  }`}
                >
                  {firstOfYear && (
                    <span className="w-10 md:w-14 inline-block self-start shrink-0 text-neutral-500 text-xs dark:text-neutral-500 mt-0.5">
                      {year}
                    </span>
                  )}

                  <span className="grow dark:text-gray-100">
                    <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-all rounded-xl py-0.5 px-1.5">
                      {post.title}
                    </span>
                  </span>

                  <span className="text-neutral-500 dark:text-neutral-500 text-xs mt-0.5">
                    {post.viewsFormatted}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function getYear(date: string) {
  return new Date(date).getFullYear();
}
