import { useRouter } from "next/router";
import { useTweet } from "../../lib/tweets";
import Node from "../../static-tweet/components/html/node";
import components from "../../static-tweet/components/twitter-layout/components";
import twitterTheme from "../../static-tweet/components/twitter-layout/twitter.module.css";

export default function Tweet({ id, caption }) {
  const tweet = useTweet(id);

  // Happens when `getStaticProps` is traversing the tree to collect the tweet ids
  if (tweet.ignore) return null;

  return (
    <main className={twitterTheme.theme}>
      <Node components={components} node={tweet.ast[0]} />
      {caption != null ? <p>{caption}</p> : null}
      <style jsx>{`
        main {
          max-width: 500px;
          min-width: 220px;
          margin: 2rem auto;
        }
        p {
          font-size: 14px;
          color: #999;
          text-align: center;
          margin: 0;
          margin-top: 10px;
          padding: 0;
        }
        @media (max-width: 500px) {
          main {
            max-width: 300px;
          }
        }
      `}</style>
    </main>
  );
}
