export const Code = p => (
  <>
    <code {...p} />
    <style jsx>{`
      code {
        font-size: 14px;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
          Bitstream Vera Sans Mono, Courier New, monospace, serif;
      }
      code.inline {
        color: var(--inline-code-color);
        font-size: 1rem;
        white-space: pre-wrap;
      }
    `}</style>
  </>
);

export const Pre = p => (
  <>
    <pre {...p} />
    <style jsx>{`
      pre {
        color: var(--code-color);
        background: var(--code-bg-color);
        padding: 1.25rem;
        margin: var(--container-margin);
        white-space: pre;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    `}</style>
  </>
);
