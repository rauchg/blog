/**
 * This component gets its own file because is has an import for the tweet
 * components used by the embedded tweet page, which are the same components
 * used by the post page, so it ends up in an initialization error.
 */
import { useLoadTwitter } from '../../../lib/twitter/hooks';
import Node from '../node';
import components from '../../tweet-page/components';

const EmbeddedTweet = process.env.TWITTER_LOAD_WIDGETS
  ? p => {
      useLoadTwitter();

      return (
        <div className="quote-tweet">
          <blockquote {...p} data-conversation="none" data-cards="hidden" data-dnt="true">
            {p.children}
          </blockquote>
          <style jsx>{`
            .quote-tweet {
              display: flex;
              justify-content: center;
              margin: 1.5rem 0;
            }
          `}</style>
        </div>
      );
    }
  : p => <Node components={components} node={p.ast} />;

export default EmbeddedTweet;
