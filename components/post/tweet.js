import { useTweet } from "../../lib/tweets";
import { Tweet as ChildTweet } from "react-static-tweets";

export default function Tweet({ id, caption }) {
  const tweet = useTweet(id);

  if (tweet.ignore) {
    // this is the "collection" phase (`getTweets`)
    // where the renderer gets the list of tweets that will
    // later be rendered. This is how we "hack around" not
    // yet having Suspense based component-level data fetching
    return null;
  }

  return (
    <main>
      <ChildTweet id={id} ast={tweet.ast} />
      {caption != null ? <p>{caption}</p> : null}
      <style jsx>{`
        main {
          max-width: 100%;
          min-width: 220px;
          margin: 2rem auto;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        p {
          font-size: 14px;
          color: #999;
          text-align: center;
          margin: 0;
          margin-top: 10px;
          padding: 0;
        }
        p :global(a) {
          color: #666;
        }
      `}</style>
    </main>
  );
}
