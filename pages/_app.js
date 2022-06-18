import "react-static-tweets/styles.css";

import { MDXProvider } from "@mdx-js/react";
import P from "../components/post/paragraph";
import Link from "next/link";
import { H2 } from "../components/post/heading";
import Code from "../components/post/code";
import Snippet from "../components/post/snippet";
import Quote from "../components/post/quote";
import UL from "../components/post/bullets-list";
import OL from "../components/post/numbers-list";

const components = {
  h2: H2,
  H2: H2,
  code: Code,
  pre: Snippet,
  p: P,
  ul: UL,
  ol: OL,
  a: ({ children, href }) => {
    if (!href.startsWith("/")) {
      return (
        <a href={href} target={href.startsWith("#") ? "" : "_blank"}>
          {children}
        </a>
      );
    }
    return <Link href={href}>{children}</Link>;
  },
  blockquote: Quote,
};

export default function App({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
