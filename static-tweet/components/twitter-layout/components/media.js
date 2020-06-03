import dynamic from 'next/dynamic';

const LoadDetailsDialog = dynamic(() => import('../details-dialog'), { ssr: false });

export const Img = ({ width, height, src, ...p }) => (
  <details>
    <summary>
      <img {...p} src={`${src}&name=small`} />
    </summary>

    <details-dialog>
      <div className="bg" data-close-dialog />
      <img {...p} className="large-photo" src={`${src}&name=large`} />
    </details-dialog>

    <LoadDetailsDialog />

    <style jsx>{`
      summary {
        position: relative;
        padding-bottom: ${(height / width) * 100 || 0}%;
      }
      summary > img {
        position: ${height && width ? 'absolute' : 'static'};
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
      summary > img {
        width: 100%;
        height: 100%;
        max-height: 100vh;
        object-fit: cover;
        cursor: pointer;
      }
      .large-photo {
        width: auto;
        max-width: 100%;
        max-height: 100%;
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
