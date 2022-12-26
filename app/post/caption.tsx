import type { ReactNode } from "react";

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs my-3 font-mono text-center [&>a]:post-link">
      {children}
    </p>
  );
}
