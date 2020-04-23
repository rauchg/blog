import { Fragment } from 'react';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

export const TwitterLink = p => (
  <a href={p.href} target="_blank" rel="noopener noreferrer" title={p.title || p.href}>
    <s>{p.type}</s>
    <b>{p.children}</b>

    <style jsx>{`
      a {
        color: #22bad9;
        text-decoration: none;
      }
      a:hover > b {
        text-decoration: underline;
      }
      s {
        text-decoration: none;
      }
    `}</style>
  </a>
);

export const Mention = p => (
  <TwitterLink href={p.href} type="@">
    {p.children[0].replace(/^@/, '')}
  </TwitterLink>
);

export const Hashtag = p => (
  <TwitterLink href={p.href} type="#">
    {p.children[0].replace(/^\#/, '')}
  </TwitterLink>
);

export const Cashtag = p => (
  <TwitterLink href={p.href} type="$">
    {p.children[0].replace(/^\$/, '')}
  </TwitterLink>
);

export const Emoji = p => (
  <>
    <img {...p} />
    <style jsx>{`
      img {
        height: 18px;
        width: 18px;
        margin: 0 2px;
        vertical-align: -3px;
      }
    `}</style>
  </>
);

// Note: Poll data is most likely cached, so ongoing polls will not be updated
// until a revalidation happens
export const Poll = ({ data }) => {
  const votesCount = data.options.reduce((count, option) => count + option.votes, 0);
  const endsAt = new Date(data.endsAt);
  const now = new Date();

  return (
    <div className="poll">
      <div className="options">
        {data.options.map(option => {
          const per = Math.round((option.votes / votesCount) * 100) || 0;
          const width = per || 1 + '%';
          const widthLabel = per + '%';

          return (
            <Fragment key={option.position}>
              <span className="label">{option.label}</span>
              <span className="chart" style={{ width }}></span>
              <span>{widthLabel}</span>
            </Fragment>
          );
        })}
      </div>
      <hr />
      <div className="footer">
        <span className="votes-count">{votesCount} votes</span>
        <span>{now > endsAt ? 'Final results' : `${formatDistanceStrict(endsAt, now)} left`}</span>
      </div>

      <style jsx>{`
        .poll {
          margin: var(--poll-margin);
        }
        .options {
          display: grid;
          grid-template-columns: max-content 14rem max-content;
          align-items: center;
          grid-gap: 1rem;
          overflow: auto;
        }
        .label {
          overflow: auto;
          text-align: right;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .chart {
          height: 100%;
          background: var(--poll-bar-color);
        }
        hr {
          border: 0;
          border-top: 1px solid var(--accents-2);
          margin: 1rem 0 0.5rem 0;
        }
        .footer {
          display: flex;
          font-size: 0.875rem;
          color: var(--accents-4);
        }
        .votes-count {
          flex-grow: 1;
        }
        @media screen and (max-width: 450px) {
          .options {
            grid-template-columns: max-content 7rem max-content;
          }
        }
      `}</style>
    </div>
  );
};
