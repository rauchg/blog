const Figure = ({ desc, href, children, wide, height, width }) => {
  const content =
    height && width ? (
      <div
        style={{
          position: "relative",
          display: "inline-block",
          maxWidth: "100%",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width,
            paddingBottom: (height / width) * 100 + "%"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            margin: "auto",
            height: "auto",
            maxWidth: "100%"
          }}
        >
          {children}
        </div>
      </div>
    ) : (
      children
    );
  return (
    <div className={wide && "wide"}>
      {href ? (
        <a href={href} target="_blank">
          {content}
        </a>
      ) : (
        content
      )}
      {desc && <p>{desc}</p>}
      <style jsx>{`
        div {
          text-align: center;
        }
        p {
          font-size: 13px;
          color: #999;
          text-align: center;
          display: block;
          margin-top: 10px;
        }
        .wide {
          background: #f2f2f2;
          position: relative;
        }
        .wide::before {
          width: 10000%;
          content: "";
          left: -1000px;
          height: 100%;
          position: absolute;
          background: #f2f2f2;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

const Image = ({ style, width, src }) => (
  <div style={style}>
    <img
      async
      loading="lazy"
      decoding="async"
      importance="low"
      width={width}
      src={src}
    />
    <style jsx>{`
      div {
        margin: auto;
      }
      img {
        max-width: 100%;
      }
    `}</style>
  </div>
);

const Video = ({ src }) => (
  <div>
    <video autoPlay loop src={src} />
    <style jsx>{`
      video {
        max-width: 100%;
      }
    `}</style>
  </div>
);

export default Figure;
export { Image, Video };
