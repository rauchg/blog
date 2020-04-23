export const P = p => (
  <p>
    {p.children}
    <style jsx>{`
      p {
        margin: var(--text-margin);
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `}</style>
  </p>
);

export const Blockquote = p => (
  <>
    <blockquote {...p} />
    <style jsx>{`
      blockquote {
        background: var(--accents-1);
        color: var(--accents-5);
        border: 1px solid var(--accents-2);
        margin: var(--container-margin);
        padding: 0 1.25rem;
      }
    `}</style>
  </>
);

export const Hr = p => (
  <>
    <hr {...p} />
    <style jsx>{`
      hr {
        border: 0;
        border-top: 1px solid var(--accents-2);
        margin: var(--text-margin);
      }
    `}</style>
  </>
);
