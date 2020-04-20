import css from 'styled-jsx/css';

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

    --tweet-font: normal normal 16px/1.4 Helvetica, Roboto, 'Segoe UI', Calibri,
      sans-serif;
    --tweet-font-color: #1c2022;
    --tweet-bg-color: #fff;
    --tweet-border: 2px solid #e1e8ed;
    --tweet-border-hover: 2px solid #ccd6dd;
    --tweet-link-color: #2b7bb9;
    --tweet-link-color-hover: #3b94d9;
    --tweet-color-gray: #697882;
    --tweet-color-red: #e02460;
  }

  ::selection {
    background-color: #0070f3;
    color: #fff;
  }
`;

export default style;
