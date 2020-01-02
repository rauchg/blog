import css from "styled-jsx/css";

const style = css.global`
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  a[href] {
    color: var(--link-color);
  }
`;

export default style;
