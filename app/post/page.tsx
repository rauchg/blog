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
          <a href="#" className="hover:text-gray-600">
            @rauchg
          </a>
        </span>

        <span className="mx-2">|</span>

        <span>June 23, 2001 (2y ago)</span>
      </p>

      <p className="my-5">
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

      <p className="my-5">
        Our vision of the Web is a global realtime medium for both creators and
        consumers, where all friction and latency are eliminated.
      </p>

      <p className="my-5">We&rsquo;ll use this investment to:</p>

      <ol className="my-5 list-decimal list-inside">
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

      <h2 className="group font-bold text-xl my-8 relative">
        <span id="next-momentum" className="absolute -top-[20px]" />
        <span className="relative">
          <a
            href="#next-momentum"
            className="invisible group-hover:visible font-normal absolute w-7 -ml-7 text-center text-gray-400 dark:text-gray-500"
          >
            #
          </a>{" "}
          1. Build the SDK for Web
        </span>
      </h2>

      {/* @ts-ignore */}
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
            to one another
          </>
        }
      />

      <p className="my-5">
        Unlike other software development platforms, the Web never came with an
        SDK or Standard Development Kit.
      </p>

      <p className="my-5">
        While new browser APIs are constantly being added, the responsibility
        still falls on the developer to assemble them into an engine for every
        new project.
      </p>

      <p className="my-5">
        The resulting diversity of tools and choices makes the Web the
        innovative and dynamic medium that it is, but it can also be a major
        obstacle, as companies rally to reinvent themselves in the digital
        medium.
      </p>

      <p className="my-5">
        React,{" "}
        <a href="#" className="post-link">
          now 8 years old
        </a>
        , has proven to be a durable abstraction and{" "}
        <a href="#" className="post-link">
          building block
        </a>
        , a narrative violation of the common wisdom that &ldquo;frontend
        frameworks are changed every week.&rdquo;
      </p>

      <p className="my-5">
        Next.js builds on this formidable foundation to give developers and
        companies a meaningful starting point to build great pages, open
        sourcing the lessons learned from the giants of the Web.
      </p>

      {/* @ts-ignore */}
      <Tweet id="1390309469561659396" />

      <h2 className="group font-bold text-xl my-8 relative">
        <span id="realtime" className="absolute -top-[20px]" />
        <span className="relative">
          <a
            href="#realtime"
            className="invisible group-hover:visible font-normal absolute w-7 -ml-7 text-center text-gray-400 dark:text-gray-500"
          >
            #
          </a>{" "}
          2. Lower the barrier of entry
        </span>
      </h2>

      <p className="my-5">
        Vercel has given developers access to global infrastructure to deploy
        and scale frontend projects. But significant challenges remain to
        frictionless collaboration:
      </p>

      <ul className="my-5 list-inside list-none">
        <li className="my-1 before:text-gray-400 before:content-['–'] before:mr-2">
          Setting up and maintaining your developer environment
        </li>
        <li className="my-1 before:text-gray-400 before:content-['–'] before:mr-2">
          Integrating it into Git for continuous integration
        </li>
        <li className="my-1 before:text-gray-400 before:content-['–'] before:mr-2">
          Manually pushing and waiting to share progress with your team
        </li>
      </ul>

      {/* @ts-ignore */}
      <Tweet
        id="1404291533042372608"
        caption="We can all contribute to the web, faster"
      />

      <p className="my-5">
        Perhaps the most incredible aspect of the Web is that it&rsquo;s not a
        read-only medium. Each Web browser is simultaneously the{" "}
        <a href="#" className="post-link">
          consumption and creation mechanism
        </a>
        .
      </p>

      <p className="my-5">
        With{" "}
        <a href="#" className="post-link">
          Next.js Live
        </a>
        , we want to build a Web that everyone can contribute to. Whether
        it&rsquo;s to pitch in an idea or an edit, by an experienced developer
        or a new designer, from a local editor or the browser itself.
      </p>

      {/* @ts-ignore */}
      <Tweet id="1404833080435634179" />

      <h2 className="group font-bold text-xl my-8 relative">
        <span id="real" className="absolute -top-[20px]" />
        <span className="relative">
          <a
            href="#real"
            className="invisible group-hover:visible font-normal absolute w-7 -ml-7 text-center text-gray-400 dark:text-gray-500"
          >
            #
          </a>{" "}
          3. Focus on the end-user
        </span>
      </h2>

      {/* @ts-ignore */}
      <Tweet id="1404218263354101761" />

      <p className="my-5">
        A particularly interesting challenge of building a platform and tooling
        company is that you have two users (whether it&rsquo;s acknowledged or
        not):
      </p>

      <ol className="my-5 list-decimal list-inside">
        <li className="my-1">The user of the tool</li>
        <li className="my-1">The user of the output of the tool</li>
      </ol>

      <p className="my-5">
        No matter how many downloads Next.js gets, or how delightful and
        realtime the development experience, a universal truth remains:{" "}
        <a href="#" className="post-link">
          <b>the customer is king</b>
        </a>
        .
      </p>

      <p>
        Performance for the end-user has been baked in the design of everything
        we make. To name some examples:
      </p>

      <ul className="my-5 list-inside list-none">
        <li className="my-1 before:text-gray-400 before:content-['–'] before:mr-2">
          Next.js was born out of the insight that React in its initial Single
          Page Application presentation was putting the rendering burden on the
          user's device that should have been on the{" "}
          <a href="#" className="post-link">
            server
          </a>{" "}
          instead.
        </li>
      </ul>
    </article>
  );
}
