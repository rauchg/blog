import { useLoadTwitter } from '../../../lib/twitter/hooks';

export const P = p => (
  <p>
    {p.children}
    <style jsx>{`
      p {
        margin: 1.25rem 0;
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
        margin: 1.5rem 0;
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
        margin: 1.25rem 0;
      }
    `}</style>
  </>
);
