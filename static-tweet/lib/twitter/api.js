import fetch from '../fetch';

const API_URL = 'https://api.twitter.com';
const SYNDICATION_URL = 'https://syndication.twitter.com';

function twitterLabsEnabled(expansions) {
  if (process.env.TWITTER_LABS_ENABLED !== 'true') return false;
  if (!expansions) return true;

  const exp = process.env.TWITTER_LABS_EXPANSIONS || '';

  return exp.includes(expansions);
}

export async function fetchTweetsHtml(ids) {
  const res = await fetch(`${SYNDICATION_URL}/tweets.json?ids=${ids}`);

  if (res.ok) return res.json();
  if (res.status === 404) return {};

  throw new Error(`Fetch for the embedded tweets of "${ids}" failed with code: ${res.status}`);
}

export async function fetchTweetHtml(id) {
  const html = await fetchTweetsHtml(id);
  return html[id];
}

export async function fetchUserStatus(tweetId) {
  // If there isn't an API token don't do anything, this is only required for videos.
  if (!process.env.TWITTER_API_TOKEN) return;

  const res = await fetch(
    `${API_URL}/1.1/statuses/show/${tweetId}.json?include_entities=true&tweet_mode=extended`,
    {
      headers: {
        authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  );

  console.log('Twitter x-rate-limit-limit:', res.headers.get('x-rate-limit-limit'));
  console.log('Twitter x-rate-limit-remaining:', res.headers.get('x-rate-limit-remaining'));
  console.log('Twitter x-rate-limit-reset:', res.headers.get('x-rate-limit-reset'));

  if (res.ok) return res.json();
  if (res.status === 404) return;

  throw new Error(`Fetch to the Twitter API failed with code: ${res.status}`);
}

export async function fetchTweetWithPoll(tweetId) {
  const expansions = 'attachments.poll_ids';

  // If there isn't an API token or Twitter Labs is not enabled, don't do anything,
  // this is only required for Polls.
  if (!process.env.TWITTER_API_TOKEN || !twitterLabsEnabled(expansions)) return;

  const res = await fetch(
    `${API_URL}/labs/1/tweets?format=compact&expansions=${expansions}&ids=${tweetId}`,
    {
      headers: {
        authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  );

  console.log('Twitter Labs x-rate-limit-limit:', res.headers.get('x-rate-limit-limit'));
  console.log('Twitter Labs x-rate-limit-remaining:', res.headers.get('x-rate-limit-remaining'));
  console.log('Twitter Labs x-rate-limit-reset:', res.headers.get('x-rate-limit-reset'));

  if (res.ok) return res.json();
  if (res.status === 404) return;

  throw new Error(`Fetch to the Twitter Labs API failed with code: ${res.status}`);
}

export async function getEmbeddedTweetHtml(url) {
  const res = await fetch(`https://publish.twitter.com/oembed?url=${url}`);

  if (res.ok) return res.json();
  if (res.status === 404) return;

  throw new Error(`Fetch for embedded tweet failed with code: ${res.status}`);
}
