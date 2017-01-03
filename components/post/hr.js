export default () => (
  <div>
    <style jsx>{`
      div {
        border-style: none;
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
      }

      div::after {
        content: '***';
        text-align: center;
        display: inline;
      }
    `}</style>
  </div>
)
