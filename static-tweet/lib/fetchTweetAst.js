import GithubSlugger from 'github-slugger';
import { fetchTweetHtml } from './twitter/api';
import { getTweetData } from './twitter/tweet-html';
import getTweetHtml from './twitter/getTweetHtml';
import htmlToAst from './markdown/htmlToAst';

class Context {
  slugger = new GithubSlugger();
  map = [];
  get(id) {
    return this.map[Number(id)];
  }
  add(data, nodes) {
    return this.map.push({ data, nodes }) - 1;
  }
}

export default async function fetchTweetAst(url, thread) {
  const tweetHtml = await fetchTweetHtml(url);
  const tweet = tweetHtml && getTweetData(tweetHtml, { thread });

  if (!tweet) return;

  const context = new Context();
  const html = await Promise.all(tweet.map(t => getTweetHtml(t, context)));
  const ast = await htmlToAst(html.join(''), context);

  return ast;
}
