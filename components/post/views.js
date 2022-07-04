import { useEffect, useRef } from "react";
import { useQuery } from "@/convex/_generated/react";

export default function Views({ id }) {
  const didLogViewRef = useRef(false);
  const views = useQuery("getViews", id) ?? null;

  useEffect(() => {
    if (!didLogViewRef.current) {
      const url = "/api/view?id=" + encodeURIComponent(id);
      fetch(url).catch(console.error);
      didLogViewRef.current = true;
    }
  });

  return (
    <>
      <span className={`views ${views === null ? "loading" : ""}`}>
        {views != null && (
          <>
            <em>{views}</em> views
          </>
        )}
        <style jsx>{`
          .views {
            opacity: 1;
            transition: 100ms ease-in opacity;
          }

          .views em {
            font-style: normal;
            font-variant-numeric: tabular-nums;
          }

          .views.loading,
          .views.error {
            opacity: 0;
          }
        `}</style>
      </span>
    </>
  );
}
