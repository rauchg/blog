import convexConfig from "@/convex.json";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function view(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: 'Missing "id" query' }, { status: 400 });
  }

  await fetch(`${convexConfig.prodUrl}/api/0.1.4/udf`, {
    method: "POST",
    body: JSON.stringify({
      path: "addView",
      args: [process.env.CONVEX_AUTH_SECRET, id],
      tokens: [],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json({
    ok: true,
  });
}

export const config = {
  runtime: "edge",
};
