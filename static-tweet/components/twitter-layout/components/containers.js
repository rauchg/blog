export const Div = p => (
  <div className={p.className}>
    {p.children}
    <style jsx>{`
      .image-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
        margin: var(--container-margin);
      }
      .image-count-3 > :global(:first-child) {
        grid-row-end: span 2;
      }
      .gif-container,
      .video-container {
        margin: var(--container-margin);
      }
      .gif-container > :global(video),
      .video-container > :global(video) {
        width: 100%;
        max-height: 500px;
      }
    `}</style>
  </div>
);
