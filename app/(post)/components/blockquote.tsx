import type { ReactNode } from "react";

export function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-5 text-red-200 pl-3 border-l-4 border-red-300">
      {children}
    </blockquote>
  );
}
