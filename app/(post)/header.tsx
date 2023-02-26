"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import clientConfig from "@/convex/_generated/clientConfig";
import { useQuery } from "@/convex/_generated/react";
import postsData from "@/posts.json";
import { ago } from "time-ago";
import type { View } from "@/convex/getAllViews";

const convex = new ConvexReactClient(clientConfig);

export function Header({ views }) {
  const pathname = usePathname();

  // fetch post. ideally this would happen in a server component 😬
  const post = useMemo(() => {
    if (pathname == null) return null;
    const id = pathname.split("/").pop();
    return postsData.posts.find(post => post.id === id);
  }, [pathname]);

  // compute time ago client side since it's relative to user's timezone
  const [timeAgo, setTimeAgo] = useState(null);
  useEffect(() => {
    if (post != null) {
      setTimeAgo(ago(post.date, true));
    }
  }, [post]);

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

          <span>
            {post.date} {timeAgo && `(2y ago)`}
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
