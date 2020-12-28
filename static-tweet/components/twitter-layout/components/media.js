import dynamic from 'next/dynamic';
import Image from 'next/image';

const LoadDetailsDialog = dynamic(() => import('../details-dialog'), { ssr: false });

export const Img = ({ width, height, src, ...p }) => (
  <details>
    <summary>
      <Image {...p} src={`${src}&name=small`} layout="fill" objectFit="cover" quality={80} />
    </summary>

    <details-dialog>
      <div className="bg" data-close-dialog />
      <Image {...p} src={`${src}&name=large`} width={width} height={height} />
    </details-dialog>

    <LoadDetailsDialog />

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
      summary :global(img) {
        cursor: pointer;
      }
      :global(details-dialog) {
        position: fixed;
        top: 0;
        left: 50%;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        text-align: center;
        transform: translateX(-50%);
        padding: 5vh 1.5rem;
        z-index: 999;
      }
      details[open] :global(details-dialog) > .bg {
        position: fixed;
        background: rgba(0, 0, 0, 0.3);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: -1;
      }
      @media screen and (max-width: 450px) {
        :global(details-dialog) {
          padding: 5vh 1rem;
        }
      }
    `}</style>
  </details>
);
