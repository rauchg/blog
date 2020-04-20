import unified from 'unified';
import markdown from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import raw from 'rehype-raw';
import prism from '@mapbox/rehype-prism';

const handlers = {
  // Add a className to inlineCode so we can differentiate between it and code fragments
  inlineCode(h, node) {
    return {
      ...node,
      type: 'element',
      tagName: 'code',
      properties: { className: 'inline' },
      children: [
        {
          type: 'text',
          value: node.value,
        },
      ],
    };
  },
};

function toAst() {
  this.Compiler = tree => tree;
}

// Create the processor, the order of the plugins is important
const processor = unified()
  .use(markdown)
  .use(remarkToRehype, { handlers, allowDangerousHTML: true })
  // Add custom HTML found in the tweet to the AST
  .use(raw)
  // Add syntax highlighting
  .use(prism)
  .use(toAst);

export default async function markdownToAst(md) {
  try {
    const file = await processor.process(md);
    return file.contents;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Markdown to AST error: ${error}`);
    throw error;
  }
}
