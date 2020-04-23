import ReactDOMServer from "react-dom/server";
import fetchTweetAst from "../static-tweet/lib/fetchTweetAst";
import { TweetsMap } from "./tweets";

export default async function getTweets(Page) {
  const ids = [];
  const addTweet = id => {
    if (!ids.includes(id)) ids.push(id);
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <TweetsMap.Provider value={addTweet}>
      <Page />
    </TweetsMap.Provider>
  );

  const tweetsData = await Promise.all(
    ids.map(async id => {
      const url = `https://twitter.com/user/status/${id}`;
      const ast = await fetchTweetAst(url);

      return { id, ast };
    })
  );
  const tweets = tweetsData.reduce((result, { id, ast }) => {
    if (ast) result[id] = ast;
    return result;
  }, {});

  return tweets;
}
