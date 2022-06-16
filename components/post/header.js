import Head from "next/head";
import { useState, useEffect } from "react";
import TimeAgo from "../time-ago";
import NextImage from "next/image";
import dynamic from "next/dynamic";

const Views = dynamic(() => import("./views"));

const Header = ({ id, title, date }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>

      <nav>
        <span className="meta">
          <a
            className="author"
            href="https://twitter.com/rauchg"
            target="_blank"
          >
            <span className="img">
              <NextImage
                src="/images/rauchg.png"
                width={25}
                height={25}
                layout="fixed"
              />
            </span>
            rauchg
          </a>

          {isMounted ? (
            <span className={`date ${isMounted ? "" : "loading"}`}>
              <span className="sep" />
              <span className="short">
                <TimeAgo date={date} />
              </span>
              <span className="full">
                <TimeAgo date={date} long={true} />
              </span>
            </span>
          ) : null}
        </span>

        <Views id={new Date(date).getFullYear() + "-" + id} />
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: var(--meta-text-color);
        }

        nav a {
          color: inherit;
        }

        .meta {
          display: flex;
          font-weight: 500;
          align-items: center;
        }

        .meta .date {
          opacity: 1;
          transition: 100ms ease-in opacity;
        }

        .meta .date.loading {
          opacity: 0;
          pointer-events: none;
        }

        .meta .date {
          display: flex;
          align-items: center;
        }

        .meta a.date {
          text-decoration: none;
          border-bottom-width: 1px;
          border-bottom-style: dashed;
          border-bottom-color: var(--text-meta);
        }

        .meta .date .full {
          display: none;
        }

        .meta .date .sep {
          background: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNLjUgMTUuNWw3LTE1IiBzdHJva2U9IiNDOEM4QzgiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIvPjwvc3ZnPg==);
          width: 8px;
          height: 16px;
          margin-right: 10px;
        }

        .meta .author {
          display: flex;
          align-items: center;
          padding-right: 10px;
          text-decoration: none;
        }

        .meta .author .img {
          width: 25px;
          height: 25px;
          border-radius: 100%;
          margin-right: 5px;
          display: inline-block;
          overflow: hidden;
        }

        .twitter {
          display: flex;
          align-items: center;
        }

        .twitter a {
          display: flex;
          align-items: center;
          margin-left: 15px;
          text-decoration: none;
        }

        .twitter :global(svg) {
          width: 15px !important;
          margin-right: 5px;
        }

        @media (any-hover: hover) {
          nav a:hover {
            color: var(--link-color);
          }
        }

        @media (min-width: 500px) {
          .meta .date .short {
            display: none;
          }
          .meta .date .full {
            display: inherit;
          }
        }
      `}</style>
    </main>
  );
};

export default Header;
