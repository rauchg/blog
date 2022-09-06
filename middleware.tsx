import { NextResponse } from "next/server";
import links from "./links.json";

let initialDate = Date.now();

export default async function middleware(req) {
  const next = NextResponse.next();
  next.headers.set("x-edge-age", String(Date.now() - initialDate));

  const url = new URL(req.nextUrl);
  if (url.pathname.startsWith("/links/")) {
    const linkId = url.pathname.split("/")[2];
    const link = links[linkId];

    if (!linkId) {
      const notFound = new URL("/404", req.nextUrl);
      return NextResponse.rewrite(notFound);
    }

    if (
      url.searchParams.get("bot") ||
      /bot/i.test(req.headers.get("user-agent"))
    ) {
      return next;
    } else {
      return NextResponse.redirect(link.link);
    }
  }

  return next;
}
