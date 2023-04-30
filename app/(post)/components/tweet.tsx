import { Tweet as ReactTweet } from "react-tweet";
import { Caption } from "./caption";
import type { ReactNode } from "react";
import "./tweet.css";

// we import this globally in the top-most layout.tsx file
// until Next.js lands suspense-y CSS support
// import "./tweet.css";

interface TweetArgs {
  id: string;
  caption: ReactNode;
}

export async function Tweet({ id, caption }: TweetArgs) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <ReactTweet id={id} />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}
