export const runtime = "edge";

import links from "@/links.json";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

export default function Link({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { bot?: string };
}) {
  const link = links[params.id];

  if (link == null) {
    return notFound();
  }

  if (searchParams.bot || /bot/i.test(headers().get("user-agent") as string)) {
    return <></>;
  } else {
    redirect(link.link);
  }
}
