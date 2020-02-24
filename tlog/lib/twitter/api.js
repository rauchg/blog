import fetch from '../fetch';

const API_URL = 'https://api.twitter.com';

function twitterLabsEnabled(expansions) {
  const labsEnabled = process.env.TWITTER_LABS_ENABLED;

  if (labsEnabled !== '1' && labsEnabled !== 'true') return false;
  if (!expansions) return true;

  const exp = process.env.TWITTER_LABS_EXPANSIONS || '';

  return exp.includes(expansions);
}

export async function fetchTweetHtml(url) {
  if (!url.startsWith('https://twitter.com/')) {
    throw new Error(`The url "${url}" does not match a Twitter thread`);
  }

  const res = await fetch(url);

  if (res.ok) return res.text();
  if (res.status === 404) return {};

  throw new Error(`Fetch for the Twitter thread of "${url}" failed with code: ${res.status}`);
}

export async function fetchUserStatus(tweetId) {
  // If there isn't an API token don't do anything, this is only required for videos.
  if (!process.env.TWITTER_API_TOKEN) return;

  const res = await fetch(`${API_URL}/1.1/statuses/show.json?id=${tweetId}`, {
    headers: {
      authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
    },
  });

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

  if (res.ok) return res.json();
  if (res.status === 404) return;

  throw new Error(`Fetch to the Twitter Labs API failed with code: ${res.status}`);
}

export async function getEmbeddedTweetHtml(url) {
  // Consider moving this to an API route
  const res = await fetch(`https://publish.twitter.com/oembed?url=${url}`);

  if (res.ok) return res.json();
  if (res.status === 404) return;

  throw new Error(`Fetch for embedded tweet failed with code: ${res.status}`);
}
