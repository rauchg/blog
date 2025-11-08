import redis from "@/app/redis";
import postsData from "@/app/posts.json";
import commaNumber from "comma-number";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") ?? null;

  if (id === null) {
    return NextResponse.json(
      {
        error: {
          message: 'Missing "id" query',
          code: "MISSING_ID",
        },
      },
      { status: 400 }
    );
  }

  const post = postsData.posts.find(post => post.id === id);

  if (post == null) {
    return NextResponse.json(
      {
        error: {
          message: "Unknown post",
          code: "UNKNOWN_POST",
        },
      },
      { status: 400 }
    );
  }

  // If Redis/KV is not configured, return mock views for now
  if (!redis) {
    // You can return 0 or a random number for demo purposes
    const mockViews = Math.floor(Math.random() * 100) + 1;
    return NextResponse.json({
      ...post,
      views: mockViews,
      viewsFormatted: commaNumber(mockViews),
    });
  }

  // Real Redis/KV tracking
  if (url.searchParams.get("incr") != null) {
    const views = await redis.hincrby("views", id, 1);
    return NextResponse.json({
      ...post,
      views,
      viewsFormatted: commaNumber(views),
    });
  } else {
    const views = (await redis.hget("views", id)) ?? 0;
    return NextResponse.json({
      ...post,
      views,
      viewsFormatted: commaNumber(Number(views)),
    });
  }
}
