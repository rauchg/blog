"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import clientConfig from "@/convex/_generated/clientConfig";
import { useQuery } from "@/convex/_generated/react";

const convex = new ConvexReactClient(clientConfig);

export function Meta() {
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

        <span className="pr-2">
          <Views />
        </span>
      </p>
    </ConvexProvider>
  );
}

function Views() {
  const views = useQuery("getViews", "2021-making-the-web-faster");
  return <>{views != null ? <span>{views} views</span> : null}</>;
}
