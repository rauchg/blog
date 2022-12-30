"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import clientConfig from "@/convex/_generated/clientConfig";
import { useQuery } from "@/convex/_generated/react";
import { useEffect, useMemo, useRef } from "react";
import type { View } from "@/convex/getAllViews";

const convex = new ConvexReactClient(clientConfig);

export function Meta({ views }) {
  return (
    <ConvexProvider client={convex}>
      <p className="font-mono flex text-xs text-gray-400 dark:text-gray-500">
        <span className="flex-grow">
          <span>
            <a
              href="#"
              className="hover:text-gray-600 dark:hover:text-gray-400"
            >
              @rauchg
            </a>
          </span>

          <span className="mx-2">|</span>

          <span>June 23, 2001 (2y ago)</span>
        </span>

        <span className="pr-1.5">
          <Views id="making-the-web-faster" defaultValue={views} />
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
