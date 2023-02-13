import sizeOf from "image-size";
import { join } from "path";
import { readFile } from "fs/promises";
import NextImage from "next/image";

export async function Image({
  src,
  caption = null,
  alt = null,
  width = null,
  height = null,
}) {
  if (!src.startsWith("data:") && (width === null || height === null)) {
    let imageBuffer = null;

    if (src.startsWith("http")) {
      imageBuffer = Buffer.from(
        await fetch(src).then(res => res.arrayBuffer())
      );
    } else {
      imageBuffer = await readFile(
        new URL(join(import.meta.url, "..", "..", "..", "..", "public", src))
          .pathname
      );
    }

    ({ width, height } = sizeOf(imageBuffer));
  }

  return (
    <div className="my-5 flex flex-col items-center">
      {src.startsWith("data:") ? (
        <img src={src} alt={alt} />
      ) : (
        <NextImage
          width={width}
          height={height}
          alt={alt ?? caption}
          src={src}
        />
      )}

      {caption && (
        <figcaption className="font-mono text-xs mt-5 text-center">
          {caption}
        </figcaption>
      )}
    </div>
  );
}
