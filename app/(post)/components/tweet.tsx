import { Caption } from "./caption";
import type { ReactNode } from "react";
import { NextTweet } from "next-tweet";

interface TweetArgs {
  id: string;
  caption?: ReactNode;
}

export function Tweet({ id, caption }: TweetArgs) {
  return (
    <div className="my-6">
      <div className="flex justify-center">
        {/* @ts-ignore: Async components are valid in the app directory */}
        <NextTweet id={id} />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}
