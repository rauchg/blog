import Page from "./main";
import { Tweets } from "../../lib/tweets";
import prismTheme from "../../tlog/components/post/prism-theme";

export default ({ tweets, children }) => (
  <Page>
    <Tweets.Provider value={tweets}>
      <main>
        <article>{children}</article>
      </main>

      <style jsx global>
        {prismTheme}
      </style>
      <style jsx>{`
        main {
          padding: 15px;
          max-width: 680px;
          margin: auto;
          font-size: 18px;
        }
      `}</style>
    </Tweets.Provider>
  </Page>
);
