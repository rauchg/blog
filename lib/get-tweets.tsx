import ReactDOMServer from "react-dom/server";
import { fetchTweetAst } from "static-tweets";
import { TweetsMap } from "./tweets";
import { getJSON, set } from "./store";

interface TweetsMap {
  [id: string]: any;
}

const tweetsCache: TweetsMap = {};

export default async function getTweets(Page: any): Promise<TweetsMap> {
  const ids = [];
  const addTweet = (id: string) => {
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
      let t = tweetsCache[id] || (await getJSON(`/tweets/${id}.json`));
      if (t == null) t = await fetchTweetAst(id);
      if (t == null) throw new Error(`Could not fetch tweet ${id}`);
      await set(`/tweets/${id}.json`, JSON.stringify(t));
      tweetsData[id] = tweetsCache[id] = t;
    })
  );

  return tweetsData;
}
