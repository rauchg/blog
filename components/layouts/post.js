import Page from "./main";
import { Tweets } from "../../lib/tweets";

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
        font-size: 18px;
      }

      @media (min-width: 500px) {
        max-width: 42rem;
        margin: auto;
      }
    `}</style>
  </Page>
);
