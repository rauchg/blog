import { useEffect } from 'react';

export function useLoadTwitter() {
  useEffect(() => {
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    })(document, 'script', 'twitter-wjs');
  }, []);
}

export function useLoadTweets(ref) {
  useEffect(() => {
    const loadTweets = async () => {
      const { twttr } = window;

      if (twttr && (await twttr.ready())) {
        twttr.widgets.load(ref.current);
      }
    };
    loadTweets();
  }, [ref.current]);
}
