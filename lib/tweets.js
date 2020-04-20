import { createContext, useContext } from "react";

export const Tweets = createContext({});
export const TweetsMap = createContext(() => {});

export function useTweet(id) {
  const tweets = useContext(Tweets);
  const addTweet = useContext(TweetsMap)

  addTweet(id)

  return tweets ? tweets[id] : undefined;
}
