export default ({ children }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        margin: 20px 0;
        line-height: 25px;
        font-weight: 500;
      }
    `}</style>
  </p>
);
