import css from "styled-jsx/css";

const style = css.global`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: var(--progress-bar-color);

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }
`;

export default style;
