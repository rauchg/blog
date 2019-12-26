export default ({ children }) => (
  <code>
    {children}
    <style jsx>{`
      code {
        color: #BE00FF;
        font-family: Menlo, monospace;
      }
    `}</style>
  </code>
);
