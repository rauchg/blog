"use client";
import { Tweet as ChildTweet } from "react-static-tweets";

interface TweetArgs {
  id: string;
  ast: any;
}

export function Tweet({ id, ast }: TweetArgs) {
  return <ChildTweet id={id} ast={ast} />;
}
