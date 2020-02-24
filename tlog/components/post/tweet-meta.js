import format from 'date-fns/format';

export default function TweetMeta({ tweet }) {
  const url = `https://twitter.com/${tweet.username}`;

  return (
    <div className="meta">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={tweet.avatar.bigger} alt={tweet.name} />
        {tweet.name}
      </a>
      <span className="sep">/</span>
      <span>{format(tweet.date, 'LLLL d, y')}</span>

      <style jsx>{`
        .meta {
          color: var(--accents-5);
          font-size: 1rem;
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        a:hover {
          color: var(--link-color);
        }
        a > img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin-right: 0.625rem;
        }
        .sep {
          margin: 0 0.625rem;
        }
      `}</style>
    </div>
  );
}
