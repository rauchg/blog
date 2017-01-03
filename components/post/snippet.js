export default ({ children }) => (
  <pre>
    <code>{ children }</code>
    <style jsx>{`
      pre {
        line-height: 20px;
        margin-bottom: 20px;
        font-size: 12px;
      }

      code {
        color: #999;
      }
    `}</style>
  </pre>
)
