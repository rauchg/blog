export function TLDR({ children }) {
  return (
    <div className="my-5 p-3">
      <b>tl;DR:</b> <div className="content">{children}</div>
      <style jsx>{`
        .wrap {
          background: #eee;
          line-height: 20px;
        }

        .content {
          display: inline;
          font-style: oblique;
        }
      `}</style>
    </div>
  );
}
