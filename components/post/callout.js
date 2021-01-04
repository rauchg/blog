const Callout = ({ emoji, children }) => (
  <p>
    <span className="emoji">{emoji}</span>

    <span className="children">{children}</span>

    <style jsx>{`
      p {
        margin: 20px 0;
        line-height: 1.5;
        display: flex;
        background: #eee;
        padding: 15px 10px;
        font-size: 16px;
        align-items: center;
      }

      .children {
        display: block;
      }

      .emoji {
        font-size: 18px;
        display: block;
        width: 35px;
        text-align: center;
      }
    `}</style>
  </p>
);

export default Callout;
