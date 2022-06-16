import commaNumber from "comma-number";
import { useObjectVal } from "react-firebase-hooks/database";
import { child, ref } from "firebase/database";
import { getDatabase } from "../../lib/firebase";
import { useEffect } from "react";

export default function Views({ id }) {
  const [views, viewsLoading, viewsError] = useObjectVal(
    child(ref(getDatabase(), "views"), id)
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      fetch(`/api/view?id=${encodeURIComponent(id)}`)
        .then(res => res.json())
        .then(({ total, error }) => {
          if (error) {
            console.error("View save error:", error);
          } else {
            console.info("View saved. Total views:", total);
          }
        })
        .catch(err => {
          console.error("View store error", err);
        });
    }
  }, []);

  return (
    <span
      className={`views ${
        viewsLoading || views == null ? "loading" : viewsError ? "error" : ""
      }`}
    >
      <em>{commaNumber(views)}</em> views
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
  );
}
