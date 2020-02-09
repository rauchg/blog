const H = ({ id, level = 2, fontSize = 20, children }) => (
  <div>
    {React.createElement(
      `h${level}`,
      { style: { fontWeight: 500, fontSize } },
      <span>
        <a href={`#${id}`} id={id}>
          #
        </a>
      </span>,
      children
    )}

    <style jsx>{`
      div {
        margin: 50px 0 25px;
        font-family: Helvetica Neue, Helvetica, Arial, "Lucida Grande",
          sans-serif;
      }

      span {
        position: absolute;
        margin-left: -15px;
        width: 15px;
      }

      a {
        visibility: hidden;
      }

      @media (min-width: 500px) {
        div:hover a,
        span:hover a {
          visibility: visible;
        }
      }
    `}</style>
  </div>
);

const H2 = H;
const H3 = props => H({ ...props, level: 3, fontSize: 18 });

export default H2;
export { H2, H3 };
