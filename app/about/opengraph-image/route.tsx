export const revalidate = 300;

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";
import { readFileSync } from "fs";
import { join } from "path";
import commaNumber from "comma-number";

// Image
const rauchgPhoto = toArrayBuffer(
  readFileSync(join(process.cwd(), "public/images/rauchg.png"))
);

// Fonts
const fontsDir = join(process.cwd(), "fonts");

const geistSans = readFileSync(join(fontsDir, "geist-regular.ttf"));

const geistSansMedium = readFileSync(join(fontsDir, "geist-medium.ttf"));

const geistMono = readFileSync(join(fontsDir, "geist-mono-regular.ttf"));

export async function GET() {
  const posts = await getPosts();
  const viewsSum = posts.reduce((sum, post) => sum + post.views, 0);

  return new ImageResponse(
    (
      <div tw="flex p-10 h-full w-full bg-white flex-col" style={font("Geist")}>
        <main tw="flex grow pt-4 w-full justify-center items-center">
          <div tw="flex flex-row">
            <div tw="flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                tw="h-74"
                alt="Guillermo Rauch"
                // @ts-ignore
                src={rauchgPhoto}
              />
            </div>

            <div tw="flex flex-col px-10 grow text-[28px] h-70 justify-center">
              <div tw="text-[64px] mb-7" style={font("Geist Medium")}>
                Guillermo Rauch
              </div>
              <div tw="flex mb-5" style={font("Geist Mono")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> CEO and Founder of
                Vercel
              </div>
              <div tw="flex mb-5" style={font("Geist Mono")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Creator of Next.js,
                Socket.IO, Mongoose
              </div>
              <div tw="flex" style={font("Geist Mono")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Lives in San
                Francisco, CA
              </div>
            </div>
          </div>
        </main>

        <footer
          tw="flex w-full justify-center text-2xl text-gray-500 mb-6"
          style={font("Geist Mono")}
        >
          {posts.length} posts / {commaNumber(viewsSum)} views
        </footer>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: geistSans,
          weight: 400,
        },
        {
          name: "Geist Medium",
          data: geistSansMedium,
          weight: 500,
        },
        {
          name: "Geist Mono",
          data: geistMono,
          weight: 400,
        },
      ],
    }
  );
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}

function toArrayBuffer(buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}
