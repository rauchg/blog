import css from "styled-jsx/css";

const style = css.global`
  :root {
    --colors-blue: #0c00ff;
    --colors-purple: #be00ff;

    --accents-1: #fafafa;
    --accents-2: #eaeaea;
    --accents-3: #999999;
    --accents-4: #888888;
    --accents-5: #666666;

    --link-color: var(--colors-blue);
    --link-highlight: yellow;
    --meta-text-color: #4f4f4f;
    --poll-bar-color: var(--colors-blue);
    --inline-code-color: var(--colors-purple);
    --code-color: #9efeff;
    --code-bg-color: #1e1e3f;

    --tweet-font: normal normal 16px/1.4 Helvetica, Roboto, 'Segoe UI', Calibri, sans-serif;
    --tweet-font-color: #000;
    --tweet-bg-color: #eee;
    --tweet-border: 2px solid var(--accents-3);
    --tweet-border-hover: 2px solid var(--accents-4);
    --tweet-link-color: #0366d6;
    --tweet-link-color-hover: #0070f3;
    --tweet-color-gray: var(--accents-5);
    --tweet-color-red: #ff0080;
  }

  ::selection {
    background-color: #0070f3;
    color: #fff;
  }
`;

export default style;
