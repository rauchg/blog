import { NextResponse } from "next/server";

const initialDate = Date.now();

export default async function middleware(_, ev) {
  const res = NextResponse.next();
  res.headers.append("x-edge", "1");
  if ("production" === process.env.NODE_ENV) {
    ev.waitUntil(log());
  }
  return res;
}

async function log() {
  console.log(Date.now() - initialDate);
  await sleep(1000);
  console.log("complete");
}

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
