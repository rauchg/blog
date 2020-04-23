import Node from '../../html/node';
import components from './index';

export default function EmbeddedTweet({ ast }) {
  return <Node components={components} node={ast} />;
}
