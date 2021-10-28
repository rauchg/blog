import { NextResponse } from "next/server";

const initialDate = Date.now();

export default async function middleware(request) {
  const res = NextResponse.next();
  res.headers.append("x-edge", "1");
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
