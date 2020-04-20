import formatNumber from '../../../../lib/format-number';

export default function TweetAction({ tweet }) {
  const userUrl = `https://twitter.com/${tweet.username}`;
  const tweetUrl = `${userUrl}/status/${tweet.id}`;
  const count = tweet.replies + tweet.retweets;

  return (
    <>
      {count > 4 ? (
        <a
          href={tweetUrl}
          title="View the conversation on Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="icon icon-reply" />
          <span className="text">{formatNumber(count)} people are talking about this</span>
          <div className="icon icon-chevron" />
        </a>
      ) : (
        <a
          href={userUrl}
          title={`View ${tweet.name}'s profile on Twitter`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="icon icon-profile" />
          <span className="text">See {tweet.name}'s other Tweets</span>
          <div className="icon icon-chevron" />
        </a>
      )}

      <style jsx>{`
        a {
          display: flex;
          color: var(--tweet-link-color);
          font-size: 0.875rem;
          align-items: center;
          padding: 0.625rem 1.25rem;
          text-decoration: none;
          border-top: var(--tweet-border);
        }
        a:hover {
          color: var(--tweet-link-color-hover);
        }
        a:hover > .icon-reply {
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%233b94d9%22%20d%3D%22M14.046%202.242l-4.148-.01h-.002c-4.374%200-7.8%203.427-7.8%207.802%200%204.098%203.186%207.206%207.465%207.37v3.828c0%20.108.045.286.12.403.143.225.385.347.633.347.138%200%20.277-.038.402-.118.264-.168%206.473-4.14%208.088-5.506%201.902-1.61%203.04-3.97%203.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787%2012.972c-1.134.96-4.862%203.405-6.772%204.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66%200-6.318-2.476-6.318-5.886%200-3.534%202.768-6.302%206.3-6.302l4.147.01h.002c3.532%200%206.3%202.766%206.302%206.296-.003%201.91-.942%203.844-2.514%205.176z%22%2F%3E%3C%2Fsvg%3E);
        }
        .icon-reply {
          width: 1.25em;
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%232b7bb9%22%20d%3D%22M14.046%202.242l-4.148-.01h-.002c-4.374%200-7.8%203.427-7.8%207.802%200%204.098%203.186%207.206%207.465%207.37v3.828c0%20.108.045.286.12.403.143.225.385.347.633.347.138%200%20.277-.038.402-.118.264-.168%206.473-4.14%208.088-5.506%201.902-1.61%203.04-3.97%203.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787%2012.972c-1.134.96-4.862%203.405-6.772%204.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66%200-6.318-2.476-6.318-5.886%200-3.534%202.768-6.302%206.3-6.302l4.147.01h.002c3.532%200%206.3%202.766%206.302%206.296-.003%201.91-.942%203.844-2.514%205.176z%22%2F%3E%3C%2Fsvg%3E);
        }
        .icon-profile {
          width: 1.25em;
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%232b7bb9%22%20d%3D%22M12%2011.816c1.355%200%202.872-.15%203.84-1.256.814-.93%201.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734%203.343%207.354%206.17c-.272%202.022-.008%203.46.806%204.39.968%201.107%202.485%201.256%203.84%201.256zM8.84%206.368c.162-1.2.787-3.212%203.16-3.212s2.998%202.013%203.16%203.212c.207%201.55.057%202.627-.45%203.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44%2012.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403%202.464-8.28%205.99c-.172.692-.028%201.4.395%201.94.408.52%201.04.82%201.733.82h12.304c.693%200%201.325-.3%201.733-.82.424-.54.567-1.247.394-1.94zm-1.576%201.016c-.126.16-.316.246-.552.246H5.848c-.235%200-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855%203.517-4.85%206.824-4.85s6.114%201.994%206.824%204.85c.06.242.017.48-.12.654z%22%2F%3E%3C%2Fsvg%3E);
        }
        .icon-chevron {
          width: 1.25em;
          background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23697882%22%20d%3D%22M17.207%2011.293l-7.5-7.5c-.39-.39-1.023-.39-1.414%200s-.39%201.023%200%201.414L15.086%2012l-6.793%206.793c-.39.39-.39%201.023%200%201.414.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023%200-1.414z%22%2F%3E%3C%2Fsvg%3E);
          margin-left: auto;
        }
        .text {
          margin-left: 0.25rem;
        }
      `}</style>
    </>
  );
}
