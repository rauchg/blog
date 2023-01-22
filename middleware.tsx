import { NextResponse } from "next/server";
import links from "./links.json";
import type { NextRequest } from "next/server";

let initialDate = Date.now();

export default async function middleware(req: NextRequest) {
  const next = NextResponse.next();
  next.headers.set("x-edge-age", String(Date.now() - initialDate));

  const url = new URL(req.nextUrl);
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

export const config = {
  matcher: "/links/:path",
};
