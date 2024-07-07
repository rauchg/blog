"use client";
import Image from "next/image";

export function Bio() {
  return (
    <a href="https://twitter.com/rauchg" target="_blank">
      <Image
        src="/images/rauchg-3d4cecf.jpg"
        alt="Guillermo Rauch"
        className="rounded-full bg-gray-100 block mt-2 mb-5 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
        unoptimized
        width={160}
        height={160}
        priority
      />
    </a>
  );
}
