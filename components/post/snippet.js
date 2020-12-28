const Snippet = ({
  children,
  smallText = false,
  scroll = true,
  caption = null,
}) => (
  <div>
    <pre
      className={`
      ${scroll ? "" : "no-scroll"}
      ${smallText ? "small-text" : ""}
    `}
    >
      <code>{children}</code>
    </pre>

    {caption != null ? <p>{caption}</p> : null}

    <style jsx>{`
      pre {
        line-height: 24px;
        background: #000;
        padding: 20px;
        margin: 0 0 10px;
        overflow-x: auto;
      }

      code {
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo,
          Courier, monospace;
      }

      pre.no-scroll {
        white-space: pre-wrap;
        word-break: break-all;
        overflow: none;
      }

      pre.small-text {
        font-size: 14px;
      }

      div {
        margin-bottom: 20px;
      }

      p {
        font-size: 14px;
        color: #999;
        text-align: center;
        margin: 0;
        padding: 0;
      }

      p :global(code) {
        color: #333;
      }

      code {
        color: #fff;
      }
    `}</style>
  </div>
);

export default Snippet;
