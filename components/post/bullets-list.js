export default ({ children }) => (
  <ul>
    {children}
    <style jsx>{`
      ul {
        margin: 0 0 20px 0;
        padding: 0;
        list-style-type: none;
      }
    `}</style>
  </ul>
);

const LI = ({ children }) => (
  <li>
    {children}
    <style jsx>{`
      li {
        margin-bottom: 15px;
        padding-left: 20px;
        line-height: 1.5;
      }

      li:before {
        content: "-";
        color: #ababab;
        position: absolute;
        margin-left: -20px;
      }
    `}</style>
  </li>
);

export { LI };
