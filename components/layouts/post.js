import Page from './main';
import { Tweets } from '../../lib/tweets';

export default ({ tweets, children }) => (
  <Page>
    <Tweets.Provider value={tweets}>
      <main>
        <article>{children}</article>
      </main>
    </Tweets.Provider>

    <style jsx>{`
      main {
        padding: 15px;
        max-width: 680px;
        margin: auto;
        font-size: 18px;
      }
    `}</style>
  </Page>
);
