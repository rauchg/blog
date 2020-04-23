import path from 'path';
import cheerio from 'cheerio';

const TWEET_VIDEO_URL = 'https://video.twimg.com/tweet_video';

// Could we use rehype directly and remove cheerio?
function getTweetContent($, tweet, isMainTweet) {
  if (!tweet.length) return;

  const meta = {};
  const content = { meta };
  const tweetContent = tweet.children('.js-tweet-text-container').children('p');
  const actions = tweet
    .children('.stream-item-footer')
    .children('.ProfileTweet-actionCountList')
    .children();
  const hasCard = tweet.children('.js-tweet-details-fixer').children('.card2').length > 0;

  let quotedTweet;
  let mediaHtml;
  let hasVideo = false;

  // Add the user avatar and date to the tweet only if it's the main tweet
  if (isMainTweet) {
    const avatar = tweet.find('.account-group').children('.avatar');
    const time = tweet.find('a.tweet-timestamp').children('span');

    meta.avatar = { bigger: avatar.attr('src') };
    meta.createdAt = Number(time.attr('data-time-ms'));
  }

  tweetContent.children('img').each(function () {
    const props = this.attribs;

    // Handle emojis inside the text
    if (props.class && props.class.includes('Emoji--forText')) {
      this.attribs = {
        'data-type': 'emoji-for-text',
        src: props.src,
        alt: props.alt,
      };
      return;
    }

    console.error('An image with the following props is not being handled:', props);
  });

  tweetContent.children('a').each(function () {
    const props = this.attribs;
    const el = $(this);

    if (props['data-expanded-url']) {
      const url = props['data-expanded-url'];
      const quotedTweetPath = tweet.children('.QuoteTweet').find('.QuoteTweet-link').attr('href');

      // Embedded Tweet
      if (quotedTweetPath && url.endsWith(quotedTweetPath)) {
        quotedTweet = { url };
        el.remove();
        return;
      }

      // If Twitter is hiding the link, it's because it's adding a card with a preview
      const isLinkPreview = props.class && props.class.includes('u-hidden');

      if (isLinkPreview) {
        // In the case of a preview we only add a line break between the link and the paragraph.
        // TODO: Add the preview HTML and remove the link
        el.before('<br>');
      }

      // Handle normal links
      const text = { type: 'text', data: url };
      // Replace the link with plain text and markdown will take care of it
      el.replaceWith(text);

      return;
    }

    // Embedded media
    if (props['data-pre-embedded'] === 'true') {
      const adaptiveMedia = tweet
        .children('.AdaptiveMediaOuterContainer')
        .children('.AdaptiveMedia');
      const isVideo = adaptiveMedia.hasClass('is-video');
      const media = $('<div>');

      // Videos and gifs
      if (isVideo) {
        const img = adaptiveMedia.find('.PlayableMedia-player').css('background-image');
        const url = new URL(img.slice(4, -1).replace(/['"]/g, ''));
        const fileName = path.basename(url.pathname);
        const ext = path.extname(fileName);
        const videoUrl = `${TWEET_VIDEO_URL}/${fileName.replace(ext, '.mp4')}`;

        // Gifs
        if (url.pathname.startsWith('/tweet_video_thumb')) {
          const video = $(
            `<video poster="${url.href}" controls playsinline autoplay muted loop>`
          ).append(`<source src="${videoUrl}" type="video/mp4">`);
          media.attr('data-type', 'gif-container').append(video);
        } else {
          // Custom videos require a call to the Twitter API to get the URL of the video
          hasVideo = true;
          media.attr('data-type', 'video-container');
        }
      } else {
        const images = adaptiveMedia.find('img');

        images.each(function () {
          const img = $(this);
          const src = img.attr('src');
          const alt = img.attr('alt');

          this.attribs = { 'data-type': 'media-image', src };
          if (alt) {
            this.attribs.alt = alt;
          }
          // Move the media img to a new container
          media.append(img);
        });
        media.attr('data-type', `image-container ${images.length}`);
      }

      mediaHtml = $('<div>').append(media).html();

      el.remove();
      return;
    }

    const asTwitterLink = type => {
      this.attribs = {
        'data-type': type,
        href: props.href,
      };
      // Replace custom tags inside the anchor with text
      el.text(el.text());
      return;
    };

    // @mention
    if (props['data-mentioned-user-id']) {
      return asTwitterLink('mention');
    }

    // #hashtag
    if (props['data-query-source'] === 'hashtag_click') {
      return asTwitterLink('hashtag');
    }

    // $cashtag
    if (props['data-query-source'] === 'cashtag_click') {
      return asTwitterLink('cashtag');
    }

    console.error('An anchor with the following props is not being handled:', props);
  });

  actions.each(function () {
    const el = $(this);
    const className = this.attribs.class;
    const is = name => className.includes(`ProfileTweet-action--${name}`);
    const count = Number(el.children('span').attr('data-tweet-stat-count'));

    if (Number.isNaN(count)) return;

    if (is('reply')) {
      meta.replies = count;
    } else if (is('retweet')) {
      meta.retweets = count;
    } else if (is('favorite')) {
      meta.likes = count;
    }
  });

  content.html = tweetContent.html();

  if (quotedTweet) content.quotedTweet = quotedTweet;
  if (mediaHtml) content.mediaHtml = mediaHtml;
  if (hasVideo) content.hasVideo = true;
  // If a card is detected, it's a Poll
  if (hasCard) content.hasPoll = true;

  return content;
}

function addTweetMetadata(data, tweet) {
  Object.assign(data.meta, {
    id: tweet.attr('data-tweet-id'),
    username: tweet.attr('data-screen-name'),
    name: tweet.attr('data-name'),
  });
  return data;
}

export function getVideo(html, { poster, url }) {
  const $ = cheerio.load(html, {
    decodeEntities: false,
    xmlMode: false,
  });
  const container = $('[data-type=video-container]');
  const video = $(`<video poster="${poster}" controls preload="none" playsinline>`).append(
    `<source src="${url}" type="video/mp4">`
  );

  return $('<div>').append(container.append(video)).html();
}

export function getTweetData(html, { thread } = {}) {
  const $ = cheerio.load(html, {
    decodeEntities: false,
    xmlMode: false,
  });
  const tweet = $('.permalink-tweet-container > .permalink-tweet');
  const tweetContent = tweet.length && getTweetContent($, tweet, true);

  if (!tweetContent) return;

  tweetContent.meta.mainTweet = true;

  const selfThread = [addTweetMetadata(tweetContent, tweet)];

  if (!thread) return selfThread;

  const replies = $('#stream-items-id');

  replies
    .children('.ThreadedConversation--selfThread')
    .children('ol')
    .children()
    .each(function () {
      const selfTweet = $(this).children('li').children('.tweet');
      const selfTweetContent = getTweetContent($, selfTweet.children('.content'));

      if (selfTweetContent) {
        selfThread.push(addTweetMetadata(selfTweetContent, selfTweet));
      }
    });

  return selfThread;
}
