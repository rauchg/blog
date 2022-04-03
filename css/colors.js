import css from "styled-jsx/css";

const style = css.global`
  [data-theme="dark"] {
    background: #000;
  }

  :root {
    --link-color: #0c00ff;
    --link-hover-background-color: #eee;
    --logo-text-color: #000;
    --cta-text-color: #fff;
    --cta-background-color: #000;
    --link-highlight: yellow;
    --meta-text-color: #4f4f4f;
  }

  [data-theme="dark"]:root {
    --link-color: #ccc;
    --link-hover-background-color: #333;
    --logo-text-color: #fff;
    --cta-text-color: #000;
    --cta-background-color: #fff;
    --link-highlight: yellow;
    --meta-text-color: #999;
  }

  ::selection {
    background-color: #0070f3;
    color: #fff;
  }
`;

export default style;
