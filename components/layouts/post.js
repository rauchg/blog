import React from "react";
import Page from "./main";
import { Tweets } from "../../lib/tweets";
import Head from "next/head";
import Header from "../post/header";
import { TwitterContextProvider } from "react-static-tweets";
import { Suspense } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import convexConfig from "@/convex.json";

const convex = new ConvexReactClient(convexConfig.origin);

const Post = ({ id, tweets, children, title, date, description, og }) => (
  <Page>
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Guillermo Rauch's blog" />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rauchg" />
      <meta property="og:image" content={og} />
    </Head>
    <Tweets.Provider value={tweets}>
      <TwitterContextProvider
        value={{
          swrOptions: {
            isPaused: () => true,
          },
        }}
      >
        <main>
          <article>
            <ConvexProvider client={convex}>
              <Header id={id} title={title} date={date} />
            </ConvexProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </article>
        </main>
      </TwitterContextProvider>
    </Tweets.Provider>
    <style jsx>{`
      main {
        padding: 15px 200px;
        font-size: 18px;
        width: 590px;
        min-height: 700px;
        border: 1px solid #e4d9c3;
        margin: 4px 0;
        float: left;
        background: url(images/frontmainslice.jpg) bottom left repeat-x;
      }

      article {
        scroll-margin-top: 50px;
      }

      @media (min-width: 500px) {
        main {
          max-width: 42rem;
          margin: auto;
        }
      }
    `}</style>
  </Page>
);

export default Post;
