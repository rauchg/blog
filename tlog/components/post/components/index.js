import { Div } from './containers';
import { H1, H2, H3, H4, H5, H6 } from './headings';
import { P, Blockquote, Hr, Span, Strong, Em, Br, B, S, Del } from './text';
import { Code, Pre } from './code';
import { A } from './anchor';
import { Ul, Ol, Li } from './lists';
import { Table, Thead, Tbody, Tr, Th, Td } from './table';
import { Img, Video, Source } from './media';
import { Tweet, Mention, Cashtag, Emoji, Poll } from './twitter';
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

  Tweet,
  Mention,
  Cashtag,
  Emoji,
  Poll,
  EmbeddedTweet,
};
