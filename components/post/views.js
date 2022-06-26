import commaNumber from "comma-number";
import useSWR from "swr";
import { useRef } from "react";

export default function Views({ id }) {
  const initialRef = useRef(true);
  const { data: views, error: viewsError } = useSWR(
    `api-view-${id}`,
    async () => {
      const url =
        "/api/view?id=" +
        encodeURIComponent(id) +
        (initialRef.current ? "&initial=1" : "");
      initialRef.current = false;
      return fetch(url).then(res => res.json());
    },
    {
      refreshInterval: 5000,
    }
  );

  return (
    <span
      className={`views ${
        views == null ? "loading" : viewsError ? "error" : ""
      }`}
    >
      {views != null && (
        <>
          <em>{commaNumber(views.total)}</em> views
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
  );
}
