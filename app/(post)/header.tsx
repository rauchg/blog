"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import clientConfig from "@/convex/_generated/clientConfig";
import { useQuery } from "@/convex/_generated/react";
import postsData from "@/posts.json";
import { ago } from "time-ago";
import type { View } from "@/convex/getAllViews";

const convex = new ConvexReactClient(clientConfig);

export function Header({ views }) {
  const segments = useSelectedLayoutSegments();
  const post = postsData.posts.find(post => post.id === segments[1]);

  if (post == null) return <></>;

  return (
    <ConvexProvider client={convex}>
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">
        {post.title}
      </h1>

      <p className="font-mono flex text-xs text-gray-400 dark:text-gray-500">
        <span className="flex-grow">
          <span>
            <a
              href="https://twitter.com/rauchg"
              className="hover:text-gray-600 dark:hover:text-gray-400"
              target="_blank"
            >
              @rauchg
            </a>
          </span>

          <span className="mx-2">|</span>

          {/* since we will pre-render the relative time, over time it
           * will diverge with what the user relative time is, so we suppress the warning.
           * In practice this is not an issue because we revalidate the entire page over time
           * and because we will move this to a server component with template.tsx at some point */}
          <span suppressHydrationWarning={true}>
            {post.date} ({ago(post.date, true)} ago)
          </span>
        </span>

        <span className="pr-1.5">
          <Views id={post.id} defaultValue={views} />
        </span>
      </p>
    </ConvexProvider>
  );
}

function Views({ id, defaultValue }) {
  const allViews = useQuery("getAllViews");
  const views = useMemo(() => {
    return (allViews ?? defaultValue)?.find((view: View) => view.postId === id)
      ?.viewsFormatted;
  }, [allViews, defaultValue, id]);
  const didLogViewRef = useRef(false);

  useEffect(() => {
    if (!didLogViewRef.current) {
      const url = "/api/view?id=" + encodeURIComponent(id);
      fetch(url).catch(console.error);
      didLogViewRef.current = true;
    }
  });

  return <>{views != null ? <span>{views} views</span> : null}</>;
}
