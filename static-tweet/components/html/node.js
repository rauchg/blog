import { createElement } from "react";
import handlers from "./handlers";

const defaultHandler = name => (props, components) => {
  const Comp = components[name];
  return Comp ? <Comp {...props} /> : createElement(name, props);
};

function handleNode({node, components, i, br, brIndex}) {
  if (typeof node === "string") {
    return node;
  }

  const handler = handlers[node.tag] || defaultHandler(node.tag);

  if (!handler) {
    console.error("Missing handler for:", node);
    return null;
  }

  const { nodes } = node;
  const props = { ...node.props, key: i };

  // Always send className as a string
  if (props.className && Array.isArray(props.className)) {
    props.className = props.className.join(" ");
  }
  if (node.data) {
    props.data = node.data;
  }

  if (nodes && Array.isArray(nodes)) {
    props.children = [];
    for (let i = 0; i < nodes.length; i++) {
      props.children.push(handleNode({node: nodes[i], components, i, br, brIndex}));

      let idx = 0;
      while (br && brIndex.i === br[0]) {
        props.children.push(<br key={'br-' + br[0] + '-' + (++idx)} />);
        br.splice(0, 1);
      }
    }
  }

  const element = handler(props, components, i, node);

  if (!element) {
    console.error("A handler returned null for:", node);
  }

  brIndex.i++;
  return element;
}

export default function Node({ components, node, br }) {
  return handleNode({node, components, br: br ? [...br] : null, brIndex: { i: 0 } });
}
