import format from 'date-fns/format';
import formatNumber from '../../../../lib/format-number';
import useMounted from '../../../../lib/use-mounted';

export default function TweetInfo({ tweet }) {
  const mounted = useMounted();
  const likeUrl = `https://twitter.com/intent/like?tweet_id=${tweet.id}`;
  const tweetUrl = `https://twitter.com/${tweet.username}/status/${tweet.id}`;
  const createdAt = typeof window !== 'undefined' && mounted ? new Date(tweet.createdAt) : null;

  return (
    <div className="info">
      <a className="like" href={likeUrl} title="Like" target="_blank" rel="noopener noreferrer">
        <div className="heart">
          <div className="icon icon-heart" role="img" />
        </div>
        {tweet.likes > 0 && <span className="likes">{formatNumber(tweet.likes)}</span>}
      </a>
      {createdAt && (
        <a className="time" href={tweetUrl} target="_blank" rel="noopener noreferrer">
          <time
            title={`Time Posted: ${createdAt.toUTCString()}`}
            dateTime={createdAt.toISOString()}
          >
            {format(createdAt, 'h:mm a - MMM d, y')}
          </time>
        </a>
      )}
      <style jsx>{`
        a {
          text-decoration: none;
        }
        .info {
          font-size: 0.875rem;
          display: flex;
        }
        .like {
          display: flex;
          color: var(--tweet-color-gray);
          margin-right: 0.75rem;
        }
        .like:visited {
          color: var(--tweet-link-color);
        }
        .like:hover {
          color: var(--tweet-color-red);
        }
        .like:hover .icon-heart {
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23E0245E%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E);
        }
        .icon-heart {
          width: 1.25em;
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23697882%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E);
        }
        .likes {
          margin-left: 0.25rem;
        }
        .time {
          color: var(--tweet-color-gray);
        }
        .time:hover,
        .time:focus {
          color: var(--tweet-link-color-hover);
        }
        .time:focus {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
