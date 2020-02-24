import { useRef } from 'react';
import { useLoadTweets } from '../../lib/twitter/hooks';
import Node from './node';

export default function Post({ tweets }) {
  const postRef = useRef();

  // Load the embedded tweets after a client-side navigation
  useLoadTweets(postRef);

  return (
    <div ref={postRef}>
      {tweets.map((node, i) => (
        <Node key={i} node={node} />
      ))}
    </div>
  );
}
