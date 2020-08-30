import React from 'react'
import Head from "next/head";
import {MDXProvider} from '@mdx-js/react'

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

const components = {
  h2: H2,
  inlineCode: Code,
  code: Snippet,
  p: P,
  a: ({ children, href }) => {
    if (!href.startsWith("/")) {
      return <a href={href} target="_blank">{children}</a>;
    }
    return <Link href={href}>{children}</Link>;
  },
  Tweet,
  blockquote: Quote
}

export default ({ frontMatter }) => {
  return withViews(({ tweets, views, children }) => {
    return <Post tweets={tweets}>
      <Header title={frontMatter.title} date={frontMatter.date} views={views} />
      <Head>
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:site_name" content="Guillermo Rauch's blog" />
        <meta
          property="og:description"
          content={frontMatter.description}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rauchg" />
        <meta
          property="og:image"
          content={frontMatter.og}
        />
      </Head>
      <MDXProvider components={components}>
        {children}
      </MDXProvider>
     </Post>;
  });
};
