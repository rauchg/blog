import fetch from '../fetch';
import { getVideo } from './tweet-html';
import { fetchUserStatus, getEmbeddedTweetHtml, fetchTweetWithPoll } from './api';
import fetchTweetAst from '../fetchTweetAst';
import markdownToAst from '../markdown/markdownToAst';

function getVideoData(userStatus) {
  const video = userStatus.extended_entities.media[0];
  const poster = video.media_url_https;
  // Find the first mp4 video in the array, if the results are always properly sorted, then
  // it should always be the mp4 video with the lowest bitrate
  const mp4Video = video.video_info.variants.find(v => v.content_type === 'video/mp4');

  if (!mp4Video) return;

  return { poster, ...mp4Video };
}

function getPollData(tweet) {
  const polls = tweet.includes && tweet.includes.polls;
  return polls && polls[0];
}

async function getMediaHtml(tweet) {
  let media = tweet.mediaHtml;

  if (tweet.hasVideo) {
    const userStatus = await fetchUserStatus(tweet.meta.id);
    const video = userStatus && getVideoData(userStatus);

    media = video ? getVideo(media, video) : null;
  }

  return media;
}

async function getQuotedTweetHtml({ quotedTweet }, context) {
  if (!quotedTweet) return;

  if (process.env.NEXT_PUBLIC_TWITTER_LOAD_WIDGETS === 'true') {
    const data = await getEmbeddedTweetHtml(quotedTweet.url);
    return data?.html;
  } else {
    const ast = await fetchTweetAst(quotedTweet.id);
    // The AST of embedded tweets is always sent as data
    return ast && `<blockquote data-id="${context.add({ ast })}"></blockquote>`;
  }
}

async function getPollHtml(tweet, context) {
  if (!tweet.hasPoll) return;

  const tweetData = await fetchTweetWithPoll(tweet.meta.id);
  const poll = tweetData && getPollData(tweetData);

  if (poll) {
    const meta = {
      type: 'poll-container',
      endsAt: poll.end_datetime,
      duration: poll.duration_minutes,
      status: poll.voting_status,
      options: poll.options,
    };

    return `<div data-id="${context.add(meta)}"></div>`;
  }
}

export default async function getTweetHtml(tweet, context) {
  const meta = { ...tweet.meta, type: 'tweet' };
  const md = await markdownToAst(tweet.html);
  const html = [
    // md.children is the markdown content, which is later added as children to the container
    `<div data-id="${context.add(meta, md.children)}">`,
    (await getMediaHtml(tweet)) || '',
    (await getQuotedTweetHtml(tweet, context)) || '',
    (await getPollHtml(tweet, context)) || '',
    `</div>`,
  ].join('');

  return html;
}
