import css from 'styled-jsx/css';

export default css.global`
  code[class*='language-'],
  pre[class*='language-'] {
    color: #9efeff;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    tab-size: 4;
    hyphens: none;
    letter-spacing: 0.5px;
    text-shadow: 0 1px #222245;
  }

  .token.comment,
  .token.prolog,
  .token.cdata {
    color: #b362ff;
  }

  .token.delimiter,
  .token.keyword,
  .token.selector,
  .token.important,
  .token.atrule {
    color: #ff9d00;
  }

  .token.operator,
  .token.attr-name {
    color: rgb(255, 180, 84);
  }

  .token.punctuation {
    color: #ffffff;
  }

  .token.boolean {
    color: rgb(255, 98, 140);
  }

  .token.tag,
  .token.tag .punctuation,
  .token.doctype,
  .token.builtin {
    color: rgb(255, 157, 0);
  }

  .token.entity,
  .token.symbol {
    color: #6897bb;
  }

  .token.number {
    color: #ff628c;
  }

  .token.property,
  .token.constant,
  .token.variable {
    color: #ff628c;
  }

  .token.string,
  .token.char {
    color: #a5ff90;
  }

  .token.attr-value,
  .token.attr-value .punctuation {
    color: #a5c261;
  }

  .token.attr-value .punctuation:first-child {
    color: #a9b7c6;
  }

  .token.url {
    color: #287bde;
    text-decoration: underline;
  }

  .token.function {
    color: rgb(250, 208, 0);
  }

  .token.regex {
    background: #364135;
  }

  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.inserted {
    background: #00ff00;
  }

  .token.deleted {
    background: #ff000d;
  }

  code.language-css .token.property,
  code.language-css .token.property + .token.punctuation {
    color: #a9b7c6;
  }

  code.language-css .token.id {
    color: #ffc66d;
  }

  code.language-css .token.selector > .token.class,
  code.language-css .token.selector > .token.attribute,
  code.language-css .token.selector > .token.pseudo-class,
  code.language-css .token.selector > .token.pseudo-element {
    color: #ffc66d;
  }

  .token.class-name {
    color: #fb94ff;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    background: none;
  }

  pre .line-highlight,
  pre .line-highlight.line-highlight,
  pre > code.line-highlight {
    margin-top: 36px;
    background: linear-gradient(to right, rgba(179, 98, 255, 0.17), transparent);
  }

  pre .line-highlight:before,
  pre > code.line-highlight:before,
  pre .line-highlight[data-end]:after,
  pre > code.line-highlight[data-end]:after {
    content: '';
  }
`;
