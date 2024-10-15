export const runtime = "edge";

import links from "@/links.json";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

export default async function Link(
  props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ bot?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const link = links[params.id];

  if (link == null) {
    return notFound();
  }

  if (searchParams.bot || /bot/i.test((await headers()).get("user-agent") as string)) {
    return <></>;
  } else {
    redirect(link.link);
  }
}
