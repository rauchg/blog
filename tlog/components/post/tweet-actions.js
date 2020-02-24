import Retweet from './icons/retweet';
import Like from './icons/like';

function formatCount(n) {
  const decimals = Math.abs(n) > 10000 ? 0 : 1;
  if (Math.abs(n) > 999) {
    return Math.sign(n) * (Math.abs(n) / 1000).toFixed(decimals) + 'K';
  }
  return String(n);
}

export default function TweetActions({ tweet }) {
  const url = `https://twitter.com/${tweet.username}/status/${tweet.id}`;

  return (
    <div className={`actions${tweet.isNav ? ' nav-actions' : ''}`}>
      <a href={url} target="_blank" rel="noopener noreferrer" title="Retweet">
        <Retweet />
        <span>{formatCount(tweet.retweets)}</span>
      </a>
      <a href={url} target="_blank" rel="noopener noreferrer" title="Like">
        <Like />
        <span>{formatCount(tweet.likes)}</span>
      </a>

      <style jsx>{`
        .actions {
          font-size: 1rem;
          display: flex;
          position: absolute;
          flex-direction: column;
          right: 100%;
          opacity: 0;
        }
        .actions a {
          display: flex;
          color: #000;
          text-decoration: none;
          margin: 0 1rem 0.5rem 0;
        }
        .actions a:hover {
          color: var(--link-color);
        }
        .actions a > span {
          margin-left: 0.375rem;
        }
        .nav-actions {
          position: static;
          opacity: 1;
          flex-direction: row;
        }
        :global(.tweet):hover .actions {
          opacity: 1;
          transition: opacity 0.2s ease-in;
        }
      `}</style>
    </div>
  );
}
