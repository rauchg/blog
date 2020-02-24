import { useRef } from 'react';
import { useLoadTweets } from '../../lib/twitter/hooks';
import defaultComponents from './components';
import handlers from './handlers';

const defaultHandler = name => (props, components) => {
  const Comp = components[name];
  return <Comp {...props} />;
};

function handleNode(node, components, i) {
  if (typeof node === 'string') {
    return node;
  }

  if (!components[node.tag]) {
    console.error('Missing component for:', node);
    return null;
  }

  const handler = handlers[node.tag] || defaultHandler(node.tag);

  if (!handler) {
    console.error('Missing handler for:', node);
    return null;
  }

  const { nodes } = node;
  const props = { ...node.props, key: i };

  // Always send className as a string
  if (props.className && Array.isArray(props.className)) {
    props.className = props.className.join(' ');
  }
  if (node.data) {
    props.data = node.data;
  }
  if (nodes && Array.isArray(nodes)) {
    props.children = nodes.map((node, i) => handleNode(node, components, i));
  }

  const element = handler(props, components, i, node);

  if (!element) {
    console.error('A handler returned null for:', node);
  }

  return element;
}

export default function Node({ components = defaultComponents, node }) {
  return handleNode(node, components);
}
