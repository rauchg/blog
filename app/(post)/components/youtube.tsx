"use client";
import YT from "react-youtube";

export function YouTube(props: any) {
  return (
    <span className="block my-5">
      <YT width="100%" {...props} />
    </span>
  );
}
