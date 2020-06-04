import { createContext, useContext } from "react";

// Saves the tweets returned as props to the page
export const Tweets = createContext({});
// Used by the server to get the list of tweets to fetch
export const TweetsMap = createContext();

export function useTweet(id) {
  const tweets = useContext(Tweets);
  const addTweet = useContext(TweetsMap);

  if (addTweet) {
    addTweet(id);
    return { ignore: true };
  }

  return { ast: tweets ? tweets[id] : undefined };
}
