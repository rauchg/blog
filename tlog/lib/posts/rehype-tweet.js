import { resolve } from 'url';
import visit from 'unist-util-visit';
import toString from 'mdast-util-to-string';

const TWITTER_URL = 'https://twitter.com';
const ABSOLUTE_URL = /^https?:\/\/|^\/\//i;
const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function visitAnchor(node) {
  if (!node.properties) return;

  const { href } = node.properties;

  if (!href) return;

  const isAbsoluteUrl = ABSOLUTE_URL.test(href);

  if (!isAbsoluteUrl) {
    node.properties.href = resolve(TWITTER_URL, href);
  }
}

export default function rehypeTweet(context) {
  // Nodes may have custom data required by the UI
  function visitData(node) {
    const ctx = context.get(node.properties.dataId);

    if (ctx?.data) node.data = ctx.data;

    // Add markdown content to the tweet container
    if (ctx?.nodes) {
      node.children.unshift(...ctx.nodes);
    }

    delete node.properties.dataId;
  }

  function visitHeading(node) {
    const text = toString(node);

    if (!text) return;

    const id = context.slugger.slug(text);

    node.data = { id };
  }

  return function transformer(tree) {
    visit(tree, node => node.properties?.dataId, visitData);
    visit(tree, node => node.tagName === 'a', visitAnchor);
    visit(tree, node => HEADINGS.includes(node.tagName), visitHeading);
  };
}
