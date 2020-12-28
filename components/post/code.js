const Code = ({ children }) => (
  <code>
    {children}
    <style jsx>{`
      code {
        color: #be00ff;
        font-family: Menlo, monospace;
        font-size: 0.95em;
      }

      code :global(> a) {
        color: #be00ff;
      }
    `}</style>
  </code>
);

export default Code;
