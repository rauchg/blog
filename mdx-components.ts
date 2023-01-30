import h1 from "app/(post)/components/h1";
import h2 from "app/(post)/components/h2";
import p from "app/(post)/components/p";
import ol from "app/(post)/components/ol";
import li from "app/(post)/components/li";
import Tweet from "app/(post)/components/tweet";

export function useMDXComponents(components: {
  [component: string]: React.ComponentType;
}) {
  return {
    ...components,
    h1,
    h2,
    p,
    ol,
    li,
    Tweet,
  };
}
