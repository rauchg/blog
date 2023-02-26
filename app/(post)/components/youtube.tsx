"use client";
import YT from "react-youtube";

export function YouTube(props: any) {
  return (
    <p className="my-5">
      <YT width="100%" {...props} />
    </p>
  );
}
