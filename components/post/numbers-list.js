const NumbersList = ({ children }) => (
  <ul>
    {children}
    <style jsx>{`
      ul {
        margin: 20px 0;
        padding: 0;
        list-style: inside decimal;
      }
    `}</style>
  </ul>
);

export default NumbersList;

const LI = ({ children }) => (
  <li>
    {children}
    <style jsx>{`
      li {
        margin-bottom: 5px;
        line-height: 1.5;
      }
    `}</style>
  </li>
);

export { LI };
