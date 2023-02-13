import { fetchTweetData } from "@/lib/fetch-tweet-data";
import { Tweet as TweetElement } from "react-static-tweets";
import { Caption } from "./caption";
import type { ReactNode } from "react";

// we import this globally in the top-most layout.tsx file
// until Next.js lands suspense-y CSS support
// import "./tweet.css";

interface TweetArgs {
  id: string;
  caption: ReactNode;
}

export async function Tweet({ id, caption }: TweetArgs) {
  const ast = await fetchTweetData(id);
  return (
    <div className="my-6">
      <div className="flex justify-center">
        <TweetElement ast={ast} />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}