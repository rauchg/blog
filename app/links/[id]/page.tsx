import links from "@/links.json";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { Suspense } from "react";

export default function Link(props: PageProps<"/links/[id]">) {
  return (
    <Suspense fallback={<p>Redirecting…</p>}>
      <LinkDestination {...props} />
    </Suspense>
  );
}

async function LinkDestination(props: PageProps<"/links/[id]">) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const link = links[params.id];

  if (link == null) {
    return notFound();
  }

  if (
    searchParams.bot ||
    /bot/i.test((await headers()).get("user-agent") as string)
  ) {
    return <></>;
  } else {
    redirect(link.link);
  }
}
