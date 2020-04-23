import unified from 'unified';
import parse from 'rehype-parse';
import sanitize from 'rehype-sanitize';
import tweet from './rehype-tweet';
import minify from './rehype-minify';
import schema from './schema';

// Create the processor, the order of the plugins is important
const getProcessor = unified()
  .use(parse)
  // Sanitize the HTML
  .use(sanitize, schema)
  .use(minify)
  .freeze();

export default async function htmlToAst(html, context) {
  try {
    const processor = getProcessor().use(tweet, context);
    const file = await processor.process(html);
    return file.contents;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`HTML to AST error: ${error}`);
    throw error;
  }
}
