import { A as a } from "app/(post)/components/a";
import { P as p } from "app/(post)/components/p";
import { H1 as h1 } from "app/(post)/components/h1";
import { H2 as h2 } from "app/(post)/components/h2";
import { OL as ol } from "app/(post)/components/ol";
import { UL as ul } from "app/(post)/components/ul";
import { LI as li } from "app/(post)/components/li";
import { HR as hr } from "app/(post)/components/hr";
import { Tweet } from "app/(post)/components/tweet";
import { Image } from "app/(post)/components/image";
import { Snippet } from "app/(post)/components/snippet";
import { Callout } from "app/(post)/components/callout";
import { Ref, FootNotes, FootNote } from "app/(post)/components/footnotes";

export function useMDXComponents(components: {
  [component: string]: React.ComponentType;
}) {
  return {
    ...components,
    a,
    h1,
    h2,
    p,
    ol,
    ul,
    li,
    hr,
    pre: Snippet,
    img: Image,
    Tweet,
    Image,
    Snippet,
    Callout,
    Ref,
    FootNotes,
    FootNote,
  };
}
