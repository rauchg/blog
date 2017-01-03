export default ({ children }) => (
  <code>
    { children }
    <style jsx>{`
      code {
        color: #999;
        font-family: monospace;
      }
    `}</style>
  </code>
)
