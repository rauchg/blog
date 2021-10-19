import { NextResponse as Response } from "next/server";

const initialDate = Date.now();

export default function middleware(ev) {
  ev.respondWith(
    new Response(null, {
      headers: {
        ...ev.request.headers,
        "x-edge": true,
      },
    })
  );
  ev.waitUntil(
    new Promise(resolve => {
      console.log("complete", Date.now() - initialDate);
      resolve();
    })
  );
}
