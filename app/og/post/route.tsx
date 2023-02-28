export const runtime = "edge";

import { ImageResponse } from "@vercel/og";

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

const robotoMono300 = fetch(
  new URL(
    `../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-300-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Inter 300")}
      >
        <header tw="flex text-[26px] w-full">
          <div tw="font-bold" style={font("Inter 600")}>
            Guillermo Rauch
          </div>
          <div tw="grow" />
          <div tw="text-[22px]">rauchg.com</div>
        </header>

        <main tw="flex mt-20 flex-col">
          <div
            tw="bg-gray-100 p-8 text-7xl font-medium rounded-md"
            style={font("Inter 500")}
          >
            Making the Web. Faster.
          </div>

          <div tw="mt-5 text-2xl" style={font("Roboto Mono 300")}>
            June 23, 2001 – 35,040 views
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
          name: "Roboto Mono 300",
          data: await robotoMono300,
        },
      ],
    }
  );
}

// lil helper for mroe succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
