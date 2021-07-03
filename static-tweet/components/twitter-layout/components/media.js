import dynamic from "next/dynamic";
import Image from "next/image";
import { useTweet } from "./tweet/tweet";

export const Img = ({ width, height, src, ...p }) => {
  const tweet = useTweet();
  const tweetUrl = `https://twitter.com/${tweet.username}/status/${tweet.id}`;

  return (
    <details>
      <summary>
        <a
          href={tweetUrl}
          className="avatar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            {...p}
            alt={p.alt || `Tweet from @${tweet.username}`}
            src={`${src}&name=medium`}
            layout="fill"
            objectFit="cover"
            quality={80}
          />
        </a>
      </summary>

      <style jsx>{`
        summary {
          position: relative;
          box-sizing: border-box;
          padding-bottom: ${(height / width) * 100 || 0}%;
        }
      `}</style>
      <style jsx>{`
        details {
          height: 100%;
          overflow: hidden;
        }
        summary {
          position: relative;
          height: 100%;
          list-style: none;
        }
        summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </details>
  );
};
