export default ({ emoji, children }) => (
  <p>
    <span className="emoji">{emoji}</span>

    <div>{children}</div>

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

      .emoji {
        font-size: 18px;
        display: block;
        width: 35px;
        text-align: center;
      }
    `}</style>
  </p>
);
