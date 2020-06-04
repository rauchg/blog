import cheerio from "cheerio";

function getTweetContent($) {
  const container = $(".EmbeddedTweet-tweetContainer");

  if (!container.length) return;

  const meta = {};
  const content = { meta };

  // This is the blockquote with the tweet
  const subject = container.find('[data-scribe="section:subject"]');

  // Tweet header with the author info
  const header = subject.children(".Tweet-header");
  const avatar = header.find('[data-scribe="element:avatar"]');
  const author = header.find('[data-scribe="component:author"]');
  const name = author.find('[data-scribe="element:name"]');
  const screenName = author.find('[data-scribe="element:screen_name"]');

  // Tweet body
  const tweet = subject.children('[data-scribe="component:tweet"]');
  const tweetContent = tweet.children("p");
  const card = tweet.children(".Tweet-card");
  const tweetInfo = tweet.children(".TweetInfo");
  const fullTimestamp = tweetInfo.find(
    '[data-scribe="element:full_timestamp"]'
  );
  const heartCount = tweetInfo.find('[data-scribe="element:heart_count"]');

  // Tweet footer
  const callToAction = container.children(
    '[data-scribe="section:cta component:news"]'
  );
  const profileText = callToAction.children(
    '[data-scribe="element:profile_text"]'
  );
  const conversationText = callToAction.children(
    '[data-scribe="element:conversation_text"]'
  );

  let quotedTweet;
  let mediaHtml;

  meta.id = subject.attr("data-tweet-id");
  meta.avatar = {
    normal: avatar.attr("data-src-1x"),
  };
  meta.name = name.attr("title");
  meta.username = screenName.text().substring(1); // Omit the initial @
  meta.createdAt = new Date(fullTimestamp.attr("data-datetime")).getTime();
  meta.heartCount = heartCount.text();
  meta.ctaType = profileText.length ? "profile" : "conversation";

  if (conversationText.length) {
    // Get the formatted count and skip the rest
    meta.ctaCount = conversationText.text().match(/^[^\s]+/)[0];
  }

  card.children().each(function () {
    const props = this.attribs;
    const scribe = props["data-scribe"];
    const el = $(this);

    if (scribe === "section:quote") {
      const tweetCard = el.children("a");
      const id = tweetCard.attr("data-tweet-id");
      const url = tweetCard.attr("href");

      quotedTweet = { id, url };
      return;
    }

    const media = $("<div>");

    if (scribe === "component:card") {
      const photo = el.children('[data-scribe="element:photo"]');
      const photoGrid = el.children('[data-scribe="element:photo_grid"]');
      const photos = photo.length ? photo : photoGrid;

      if (photos.length) {
        const images = photos.find("img");

        images.each(function () {
          const img = $(this);
          const alt = img.attr("alt");
          const url = img.attr("data-image");
          const format = img.attr("data-image-format");

          this.attribs = {
            "data-type": "media-image",
            src: `${url}?format=${format}`,
          };
          if (alt) {
            this.attribs.alt = alt;
          }
          // Move the media img to a new container
          media.append(img);
        });
        media.attr("data-type", `image-container ${images.length}`);
        mediaHtml = $("<div>").append(media).html();
      }
    }
  });

  tweetContent.children("img").each(function () {
    const props = this.attribs;

    // Handle emojis inside the text
    if (props.class?.includes("Emoji--forText")) {
      this.attribs = {
        "data-type": "emoji-for-text",
        src: props.src,
        alt: props.alt,
      };
      return;
    }

    console.error(
      "An image with the following props is not being handled:",
      props
    );
  });

  tweetContent.children("a").each(function () {
    const props = this.attribs;
    const scribe = props["data-scribe"];
    const el = $(this);
    const asTwitterLink = type => {
      this.attribs = {
        "data-type": type,
        href: props.href,
      };
      // Replace custom tags inside the anchor with text
      el.text(el.text());
      return;
    };

    // @mention
    if (scribe === "element:mention") {
      return asTwitterLink("mention");
    }

    // #hashtag
    if (scribe === "element:hashtag") {
      // A hashtag may be a $cashtag too
      const type =
        props["data-query-source"] === "cashtag_click" ? "cashtag" : "hashtag";
      return asTwitterLink(type);
    }

    if (scribe === "element:url") {
      const url = props["data-expanded-url"];
      const quotedTweetId = props["data-tweet-id"];

      // Remove link to quoted tweet to leave the card only
      // if (quotedTweetId && quotedTweetId === quotedTweet?.id) {
      //   el.remove();
      //   return;
      // }

      // Handle normal links
      const text = { type: "text", data: url };
      // Replace the link with plain text and markdown will take care of it
      el.replaceWith(text);
    }
  });

  content.html = tweetContent.html();

  if (quotedTweet) content.quotedTweet = quotedTweet;
  if (mediaHtml) content.mediaHtml = mediaHtml;

  return content;
}

export function getTweetData(html) {
  const $ = cheerio.load(html, {
    decodeEntities: false,
    xmlMode: false,
  });
  const tweetContent = getTweetContent($);

  return tweetContent;
}
