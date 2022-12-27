import { fetchTweetData } from "@/lib/fetch-tweet-data";
import { Tweet as TweetWrapper } from "./tweet-wrapper";
import { Caption } from "./caption";
import type { ReactNode } from "react";

interface TweetArgs {
  id: string;
  caption: ReactNode;
}

export async function Tweet({ id, caption }: TweetArgs) {
  const ast = await fetchTweetData(id);
  return (
    <div className="my-5">
      <div className="flex justify-center">
        <TweetWrapper id={id} ast={ast} />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}
