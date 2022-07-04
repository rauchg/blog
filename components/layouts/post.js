import React from "react";
import Page from "./main";
import { Tweets } from "../../lib/tweets";
import Head from "next/head";
import Header from "../post/header";
import { TwitterContextProvider } from "react-static-tweets";
import { ConvexProvider, ConvexReactClient } from "convex-dev/react";
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
    <ConvexProvider client={convex}>
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
              <Header id={id} title={title} date={date} />
              {children}
            </article>
          </main>
        </TwitterContextProvider>
      </Tweets.Provider>
    </ConvexProvider>
    <style jsx>{`
      main {
        padding: 15px;
        font-size: 18px;
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
