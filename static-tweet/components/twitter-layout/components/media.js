import dynamic from "next/dynamic";
import Image from "next/image";

export const Img = ({ width, height, src, ...p }) => (
  <details>
    <summary>
      <Image
        {...p}
        src={`${src}&name=small`}
        layout="fill"
        objectFit="cover"
        quality={80}
      />
    </summary>

    <style jsx>{`
      summary {
        position: relative;
        box-sizing: border-box;
        padding-bottom: ${(height / width) * 100 || 0}%;
      }
    `}</style>
    <style jsx>{`
      details {
        height: 100%;
        overflow: hidden;
      }
      summary {
        position: relative;
        height: 100%;
        list-style: none;
      }
      summary::-webkit-details-marker {
        display: none;
      }
    `}</style>
  </details>
);
