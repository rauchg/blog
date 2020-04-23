import css from 'styled-jsx/css';

const { className, styles } = css.resolve`
   {
    font-weight: 600;
    margin: var(--heading-margin-top) 0 var(--heading-margin-bottom) 0;
  }
`;

const Permalink = ({ children, id }) => (
  <>
    <span id={id}></span>
    <a href={`#${id}`}>{children}</a>
    <span className="permalink">#</span>

    <style jsx>{`
      span[id] {
        display: block;
        position: absolute;
        visibility: hidden;
        margin-top: calc(-1 * var(--heading-margin-top));
        padding-top: var(--heading-margin-top);
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      a:hover {
        color: inherit;
        border-bottom: 1px solid;
      }
      a:hover ~ .permalink {
        visibility: visible;
      }
      .permalink {
        visibility: hidden;
        display: none;
        font-weight: 500;
      }
      @media screen and (min-width: 992px) {
        a {
          margin-right: 0.5rem;
        }
        .permalink {
          display: inline-block;
        }
      }
    `}</style>
  </>
);

export const H1 = p => (
  <h1 className={className}>
    <Permalink id={p.data.id}>{p.children}</Permalink>
    {styles}
    <style jsx>{`
      h1 {
        font-size: 2rem;
      }
    `}</style>
  </h1>
);

export const H2 = p => (
  <h2 className={className}>
    <Permalink id={p.data.id}>{p.children}</Permalink>
    {styles}
    <style jsx>{`
      h2 {
        font-size: 1.75rem;
      }
    `}</style>
  </h2>
);

export const H3 = p => (
  <h3 className={className}>
    <Permalink id={p.data.id}>{p.children}</Permalink>
    {styles}
    <style jsx>{`
      h3 {
        font-size: 1.5rem;
      }
    `}</style>
  </h3>
);

export const H4 = p => (
  <h4 className={className}>
    <Permalink id={p.data.id}>{p.children}</Permalink>
    {styles}
    <style jsx>{`
      h4 {
        font-size: 1.25rem;
      }
    `}</style>
  </h4>
);

export const H5 = p => (
  <h5 className={className}>
    <Permalink id={p.data.id}>{p.children}</Permalink>
    {styles}
    <style jsx>{`
      h5 {
        font-size: 1rem;
      }
    `}</style>
  </h5>
);

export const H6 = p => (
  <h6 className={className}>
    <Permalink id={p.data.id}>{p.children}</Permalink>
    {styles}
    <style jsx>{`
      h6 {
        font-size: 0.875rem;
      }
    `}</style>
  </h6>
);
