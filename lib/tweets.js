import { createContext, useContext } from "react";

export const Tweets = createContext({});

export function useTweet(id) {
  const tweets = useContext(Tweets);
  return tweets ? tweets[id] : undefined;
}
