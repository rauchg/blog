import Node from '../post/node';
import components from './components';

export default function EmbeddedTweet({ ast }) {
  return <Node components={components} node={ast} />;
}
