import Code from "../components/post/code";
import Quote from "../components/post/quote";
import P from "../components/post/paragraph";
import Tweet from "../components/post/tweet";
import Snippet from "../components/post/snippet";
import YouTube from "../components/post/youtube";
import { H2, H3 } from "../components/post/heading";
import UL, { LI } from "../components/post/bullets-list";
import Figure, { Image } from "../components/post/figure";
import { Ref, FootNotes, Note } from "../components/post/footnotes";

const components = {
  p: P,
  ul: UL,
  li: LI,
  h2: H2,
  h3: H3,
  blockquote: Quote,

  Quote,
  P,
  Tweet,
  Code,
  Snippet,
  H2,
  Figure,
  Image,
  Ref,
  FootNotes,
  Note,
  UL,
  LI,
  YouTube
};

export default components;
