import { ago } from "time-ago";

export default function TimeAgo({ date, long = false }) {
  return !long ? (
    <>{ago(date, true)} ago</>
  ) : (
    <>
      {date} ({ago(date, true)} ago)
    </>
  );
}
