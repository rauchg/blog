import { ConvexHttpClient } from "convex-dev/browser";
import convexConfig from "@/convex.json";

export default async function view(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json({ error: 'Missing "id" query' }, { status: 400 });
  }

  await fetch(`${convexConfig.origin}/api/0.1.4/udf`, {
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

  return Response.json({
    ok: true,
  });
}

export const config = {
  runtime: "experimental-edge",
};
