import ReactDOMServer from "react-dom/server";
import { TweetsMap } from "./tweets";
import { fetchTweetData } from "./fetch-tweet-data";

interface TweetsMap {
  [id: string]: any;
}

const tweetsCache: TweetsMap = {};

export default async function getTweets(Page: any): Promise<TweetsMap> {
  const ids = [];
  const addTweet = (id: string) => {
    // @ts-expect-error TODO: fix type mismatch
    if (!ids.includes(id)) ids.push(id);
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <TweetsMap.Provider value={addTweet}>
      <Page />
    </TweetsMap.Provider>
  );

  let tweetsData = {};

  await Promise.all(
    ids.map(async id => {
      let t = tweetsCache[id] || (await fetchTweetData(id));
      // @ts-expect-error TODO: fix type mismatch
      tweetsData[id] = tweetsCache[id] = t;
    })
  );

  return tweetsData;
}
