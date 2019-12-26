export default ({ children }) => (
  <pre>
    <code>{children}</code>
    <style jsx>{`
      pre {
        line-height: 24px;
        margin-bottom: 20px;
        background: #000;
        padding: 20px;
      }

      code {
        color: #fff;
      }
    `}</style>
  </pre>
);
