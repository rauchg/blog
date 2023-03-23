import sizeOf from "image-size";
import { join } from "path";
import { readFile } from "fs/promises";
import { Caption } from "./caption";
import NextImage from "next/image";

export async function Image({ src, alt: originalAlt, width, height }) {
  if (!src.startsWith("data:") && (width == null || height == null)) {
    let imageBuffer: Buffer | null = null;

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

  const [, alt, , dividedBy = 100] = (originalAlt !== null
    ? originalAlt.match(/(.*) (\[(\d+)%\])?$/)
    : null) ?? [null, originalAlt];

  const factor = dividedBy / 100;

  return (
    <span className="my-5 flex flex-col items-center">
      {src.startsWith("data:") ? (
        /* eslint-disable @next/next/no-img-element */
        <img src={src} alt={alt ?? ""} />
      ) : (
        <NextImage
          width={width * factor}
          height={height * factor}
          alt={alt}
          src={src}
        />
      )}

      {alt && <Caption>{alt}</Caption>}
    </span>
  );
}
