import React from "react";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";

import Post from "./post";
import Header from "../post/header";
import withViews from "../../lib/with-views";

import P from "../post/paragraph";
import Link from "next/link";
import { H2 } from "../post/heading";
import Code from "../post/code";
import Snippet from "../post/snippet";
import Tweet from "../post/tweet";
import Quote from "../post/quote";
import UL, { LI as ULI } from "../post/bullets-list";
import OL, { LI as OLI } from "../post/numbers-list";
import TLDR from "../post/tldr";

const components = {
  h2: H2,
  inlineCode: Code,
  code: Snippet,
  p: P,
  ul: UL,
  ol: OL,
  "ul.li": ULI,
  "ol.li": OLI,
  TLDR,
  a: ({ children, href }) => {
    if (!href.startsWith("/")) {
      return (
        <a href={href} target="_blank">
          {children}
        </a>
      );
    }
    return <Link href={href}>{children}</Link>;
  },
  Tweet,
  blockquote: Quote,
};

const NextraPostLayout = ({ meta }) => {
  return withViews(({ tweets, views, children }) => {
    return (
      <Post tweets={tweets}>
        <Header title={meta.title} date={meta.date} views={views} />
        <Head>
          <meta property="og:title" content={meta.title} />
          <meta property="og:site_name" content="Guillermo Rauch's blog" />
          <meta property="og:description" content={meta.description} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@rauchg" />
          <meta property="og:image" content={meta.og} />
        </Head>
        <MDXProvider components={components}>{children}</MDXProvider>
      </Post>
    );
  });
};

export default NextraPostLayout;
