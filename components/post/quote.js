export default ({ by, children }) => (
  <blockquote>
    <p>
      { children }
      <br />
      {
        by && `– ${ by }`
      }
    </p>
    <style jsx>{`
      blockquote {
        margin: 30px 0;
        color: #9B9B9B;
        font-style: oblique;
        font-size: 12px;
      }

      p {
        line-height: 24px;
      }
    `}</style>
  </blockquote>
)
