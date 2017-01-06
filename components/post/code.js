export default ({ children }) => (
  <code>
    { children }
    <style jsx>{`
      code {
        color: #666;
        font-family: monospace;
      }
    `}</style>
  </code>
)
