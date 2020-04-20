export const Ul = p => (
  <>
    <ul {...p} />
    <style jsx>{`
      ul {
        margin: 1.25rem 0;
        list-style-type: none;
        padding-left: 1rem;
      }
      ul :global(li:before) {
        content: '-';
        color: var(--accents-3);
        position: absolute;
        margin-left: -1rem;
      }
    `}</style>
  </>
);

export const Ol = p => (
  <>
    <ol {...p} />
    <style jsx>{`
      ol {
        margin: 1.25rem 0;
        padding-left: 1rem;
      }
    `}</style>
  </>
);

export const Li = p => (
  <>
    <li {...p} />
    <style jsx>{`
      li {
        padding-left: 0;
        margin-bottom: 0.5rem;
      }
    `}</style>
  </>
);
