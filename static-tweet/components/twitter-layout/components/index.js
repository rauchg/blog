import { Div } from './containers';
import { H1, H2, H3, H4, H5, H6 } from './headings';
import { P, Blockquote, Hr } from './text';
import { Code, Pre } from './code';
import { A } from './anchor';
import { Ul, Ol, Li } from './lists';
import { Table, Th, Td } from './table';
import { Img } from './media';
import { Mention, Hashtag, Cashtag, Emoji, Poll } from './twitter';
import Tweet from './tweet/tweet';
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

  code: Code,
  pre: Pre,

  a: A,

  ul: Ul,
  ol: Ol,
  li: Li,

  table: Table,
  th: Th,
  td: Td,

  img: Img,

  Mention,
  Hashtag,
  Cashtag,
  Emoji,
  Poll,

  Tweet,
  EmbeddedTweet,
};
