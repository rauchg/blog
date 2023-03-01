export const runtime = "edge";

import { ImageResponse } from "@vercel/og";
import postsData from "@/posts.json";
import { getViews } from "@/app/get-views";
import commaNumber from "comma-number";

// rauchg photo
const rauchgPhoto = fetch(
  new URL(`../../../public/images/rauchg-3d4cecf.gray.jpg`, import.meta.url)
).then(res => res.arrayBuffer());

// fonts
const inter300 = fetch(
  new URL(
    `../../../node_modules/@fontsource/inter/files/inter-latin-300-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const inter500 = fetch(
  new URL(
    `../../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const inter600 = fetch(
  new URL(
    `../../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const robotoMono400 = fetch(
  new URL(
    `../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

export async function GET() {
  const views = await getViews();
  const viewsSum = views.reduce((acc, view) => {
    return acc + view.views;
  }, 0);

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Inter 300")}
      >
        <main tw="flex grow pt-4 w-full justify-center items-center">
          <div tw="flex flex-row">
            <div tw="flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                tw="rounded-full h-70"
                alt="Guillermo Rauch"
                src={URL.createObjectURL(
                  new Blob([await rauchgPhoto], { type: "image/jpeg" })
                )}
              />
            </div>

            <div tw="flex flex-col px-10 grow text-xl h-70 justify-center">
              <div tw="text-6xl mb-5" style={font("Inter 500")}>
                Guillermo Rauch
              </div>
              <div tw="flex mb-3" style={font("Roboto Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> CEO and Founder of
                Vercel
              </div>
              <div tw="flex mb-3" style={font("Roboto Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Creator of Next.js,
                Socket.IO, Mongoose
              </div>
              <div tw="flex" style={font("Roboto Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Lives in San
                Francisco, CA
              </div>
            </div>
          </div>
        </main>

        <footer
          tw="flex w-full justify-center text-xl text-gray-400"
          style={font("Roboto Mono 400")}
        >
          {postsData.posts.length} posts / {commaNumber(viewsSum)} views
        </footer>
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
          name: "Roboto Mono 400",
          data: await robotoMono400,
        },
      ],
    }
  );
}

// lil helper for mroe succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
