import P from "./paragraph";

export const FootNotes = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        font-size: 16px;
      }

      div::before {
        width: 200px;
        content: " ";
        margin: auto;
        border-top: 1px solid #ccc;
        padding-top: 20px;
        display: block;
        margin-top: 40px;
      }
    `}</style>
  </div>
);

export const Ref = ({ id }) => (
  <a href={`#f${id}`} id={`s${id}`}>
    [{id}]
    <style jsx>{`
      a {
        top: -5px;
        font-size: 10px;
        position: relative;
        text-decoration: none;
      }
    `}</style>
  </a>
);

export const Note = ({ id, children }) => (
  <P>
    {id}.{" "}
    <a href={`#s${id}`} id={`f${id}`}>
      ^
    </a>{" "}
    {children}
    <style jsx>{`
      a {
        text-decoration: none;
      }
    `}</style>
  </P>
);
