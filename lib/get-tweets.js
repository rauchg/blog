import fetchTweetAst from "../tlog/lib/fetchTweetAst";

export default async function getTweets(ids) {
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
