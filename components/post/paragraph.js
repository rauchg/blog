const Paragraph = ({ children }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        margin: 20px 0;
        line-height: 1.5;
      }
    `}</style>
  </p>
);

export default Paragraph;
