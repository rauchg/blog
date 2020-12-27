import Page from "./main";
import { Tweets } from "../../lib/tweets";

const Post = ({ tweets, children }) => (
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

      article {
        scroll-margin-top: 50px;
      }

      @media (min-width: 500px) {
        max-width: 42rem;
        margin: auto;
      }
    `}</style>
  </Page>
);

export default Post;
