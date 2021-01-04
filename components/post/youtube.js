import YouTube from "react-youtube";

const Youtube = props => (
  <div>
    <YouTube {...withDefault(props)} />
    <style jsx>{`
      div {
        margin: 15px 0;
      }
    `}</style>
  </div>
);

export default Youtube;

const withDefault = props =>
  Object.assign({}, props, {
    opts: Object.assign({}, props.opts || {}, {
      width: "100%",
    }),
  });
