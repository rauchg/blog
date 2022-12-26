import { Tweet } from "./tweet";
import "react-static-tweets/styles.css";

export default function Post() {
  return (
    <article className="text-gray-800 dark:text-gray-300">
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">
        Making the Web. Faster.
      </h1>
      <p className="font-mono text-xs text-gray-400 dark:text-gray-500">
        <span>
          <a href="#">@rauchg</a>
        </span>

        <span className="mx-2">|</span>

        <span>June 23, 2001 (2y ago)</span>
      </p>

      <p className="my-6">
        Following our{" "}
        <a href="#" className="post-link">
          Series B last December
        </a>
        , I&rsquo;m happy to announce we&rsquo;ve raised a{" "}
        <a href="#" className="post-link">
          <b>$102M Series C</b>
        </a>{" "}
        from existing and new investors.
      </p>

      <p className="my-6">
        Our vision of the Web is a global realtime medium for both creators and
        consumers, where all friction and latency are eliminated.
      </p>

      <p className="my-6">We&rsquo;ll use this investment to:</p>

      <ol className="my-6 list-decimal list-inside">
        <li className="my-1">
          <a href="#" className="post-link">
            <b>Build the SDK for Web</b>
          </a>
        </li>
        <li className="my-1">
          <a href="#" className="post-link">
            <b>Lower the barrier of entry</b>
          </a>
        </li>
        <li className="my-1">
          <a href="#" className="post-link">
            <b>Focus on the end-user</b>
          </a>
        </li>
      </ol>

      <h2 className="font-bold text-xl my-8 relative">
        <span id="next-momentum" className="absolute -top-[20px]" />
        <span className="relative">
          <a
            href="#next-momentum"
            className="font-normal absolute w-7 -ml-7 text-center dark:text-gray-500"
          >
            #
          </a>{" "}
          1. Build the SDK for Web
        </span>
      </h2>

      <Tweet
        id="1374492662061953034"
        caption={
          <>
            Next.js continues to grow organically as developers{" "}
            <a href="https://twitter.com/vincentchw/status/1392775589094838277">
              explain it
            </a>{" "}
            and{" "}
            <a href="https://twitter.com/vadim_kravcenko/status/1401937274972037122">
              recommend it
            </a>{" "}
          </>
        }
      />

      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
      <p>…</p>
    </article>
  );
}
