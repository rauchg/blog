import { ago } from "time-ago";

export default function TimeAgo({ date, timestamp, long = false }) {
  return !long ? (
    <>{ago(timestamp || date, true)} ago</>
  ) : (
    <>
      {date} ({ago(timestamp || date, true)} ago)
    </>
  );
}
