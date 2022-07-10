import css from "styled-jsx/css";

const style = css.global`
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: #F6F6F6;
    -webkit-font-smoothing: antialiased;
    color: #555;
  }

  a[href] {
    color: var(--link-color);
  }
`;

export default style;
