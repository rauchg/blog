import { H1 as h1 } from "app/(post)/components/h1";
import { H2 as h2 } from "app/(post)/components/h2";
import { P as p } from "app/(post)/components/p";
import { OL as ol } from "app/(post)/components/ol";
import { UL as ul } from "app/(post)/components/ul";
import { LI as li } from "app/(post)/components/li";
import { Tweet } from "app/(post)/components/tweet";
import { Image } from "app/(post)/components/image";

export function useMDXComponents(components: {
  [component: string]: React.ComponentType;
}) {
  return {
    ...components,
    h1,
    h2,
    p,
    ol,
    ul,
    li,
    img: Image,
    Tweet,
    Image,
  };
}
