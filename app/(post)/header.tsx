"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ago } from "time-ago";
import useSWR from "swr";
import type { Post } from "@/app/get-posts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Header({ posts }: { posts: Post[] }) {
  const segments = useSelectedLayoutSegments();
  // segments can be:
  // date/post
  // lang/date/post
  const initialPost = posts.find(
    post => post.id === segments[segments.length - 1]
  );
  const { data: post, mutate } = useSWR(
    `/api/view?id=${initialPost?.id ?? ""}`,
    fetcher,
    {
      fallbackData: initialPost,
      refreshInterval: 5000,
    }
  );

  if (initialPost == null) return <></>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">
        {post.title}
      </h1>

      <p className="font-mono flex text-xs text-neutral-500 dark:text-neutral-500">
        <span className="flex-grow">
          <span className="hidden md:inline">
            <span>
              <a
                href="https://twitter.com/rauchg"
                className="hover:text-neutral-800 dark:hover:text-neutral-400"
                target="_blank"
              >
                @rauchg
              </a>
            </span>

            <span className="mx-2">|</span>
          </span>

          <span>
            {post.date}
            <Suspense fallback={null}>
              <RelativeTime date={post.date} />
            </Suspense>
          </span>
        </span>

        <span className="pr-1.5">
          <Views
            id={post.id}
            mutate={mutate}
            defaultValue={post.viewsFormatted}
          />
        </span>
      </p>
    </>
  );
}

function RelativeTime({ date }: { date: string }) {
  return <span suppressHydrationWarning={true}> ({ago(date, true)} ago)</span>;
}

function Views({ id, mutate, defaultValue }) {
  const views = defaultValue;

  useEffect(() => {
    if ("development" === process.env.NODE_ENV) return;
    const url = "/api/view?incr=1&id=" + encodeURIComponent(id);
    fetch(url)
      .then(res => res.json())
      .then(obj => {
        mutate(obj);
      })
      .catch(console.error);
  }, [id, mutate]);

  return <>{views != null ? <span>{views} views</span> : null}</>;
}
