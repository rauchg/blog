import { useRouter } from "next/router";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useTweet } from "../../lib/tweets";
import Node from "../../tlog/components/post/node";
import components from "../../tlog/components/tweet-page/components";

export default function Tweet({ id, caption }) {
  const ast = useTweet(id);

  if (ast) {
    return <Node components={components} node={ast[0]} />;
  }

  return (
    <main>
      <div>
        <TwitterTweetEmbed tweetId={id} />
      </div>
      {caption != null ? <p>{caption}</p> : null}

      <style jsx>{`
        main {
          margin: 30px 0;
        }

        p {
          font-size: 14px;
          color: #999;
          text-align: center;
          margin: 0;
          margin-top: 10px;
          padding: 0;
        }

        main :global(.twitter-tweet) {
          margin: auto !important;
        }

        @media (max-width: 600px) {
          main :global(.twitter-tweet) {
            max-width: 300px !important;
            width: 300px !important;
            position: relative;
            left: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}

Tweet.tweets = [];
