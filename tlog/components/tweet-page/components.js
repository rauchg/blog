import { Div } from '../post/components/containers';
import { H1, H2, H3, H4, H5, H6 } from '../post/components/headings';
import { P, Blockquote, Hr, Span, Strong, Em, Br, B, S, Del } from '../post/components/text';
import { Code, Pre } from '../post/components/code';
import { A } from '../post/components/anchor';
import { Ul, Ol, Li } from '../post/components/lists';
import { Table, Thead, Tbody, Tr, Th, Td } from '../post/components/table';
import { Img, Video, Source } from '../post/components/media';
import { Mention, Cashtag, Emoji, Poll } from '../post/components/twitter';
import Node from '../post/node';
import Tweet from './tweet';
import EmbeddedTweet from './embedded-tweet';

export default {
  div: Div,

  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  p: P,
  blockquote: Blockquote,
  hr: Hr,
  span: Span,
  strong: Strong,
  em: Em,
  br: Br,
  b: B,
  s: S,
  del: Del,

  code: Code,
  pre: Pre,

  a: A,

  ul: Ul,
  ol: Ol,
  li: Li,

  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,

  img: Img,
  video: Video,
  source: Source,

  Mention,
  Cashtag,
  Emoji,
  Poll,

  Tweet,
  EmbeddedTweet,
};
