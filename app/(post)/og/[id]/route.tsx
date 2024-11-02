export const runtime = "edge";

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";

// fonts
const inter300 = fetch(
  new URL(
    `../../../../node_modules/@fontsource/inter/files/inter-latin-300-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const inter500 = fetch(
  new URL(
    `../../../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const inter600 = fetch(
  new URL(
    `../../../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const robotoMono400 = fetch(
  new URL(
    `../../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

export async function GET(_req: Request, props) {
  const params = await props.params;

  const {
    id
  } = params;

  const posts = await getPosts();
  const post = posts.find(p => p.id === id);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Inter 300")}
      >
        <header tw="flex text-[36px] w-full">
          <div tw="font-bold" style={font("Inter 600")}>
            Guillermo Rauch
          </div>
          <div tw="grow" />
          <div tw="text-[28px]">rauchg.com</div>
        </header>

        <main tw="flex grow pb-3 flex-col items-center justify-center">
          <div tw="flex">
            <div
              tw="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center"
              style={font("Inter 500")}
            >
              {post.title}
            </div>
          </div>

          <div
            tw="mt-5 flex text-3xl text-gray-500"
            style={font("Roboto Mono 400")}
          >
            {post.date} – {post.viewsFormatted} views
          </div>
        </main>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter 300",
          data: await inter300,
        },
        {
          name: "Inter 500",
          data: await inter500,
        },
        {
          name: "Inter 600",
          data: await inter600,
        },
        {
          name: "Roboto Mono 400",
          data: await robotoMono400,
        },
      ],
    }
  );
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
