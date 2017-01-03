import Page from './main'

export default ({ children }) => (
  <Page>
    <article>
      { children }
    </article>
    <style jsx>{`
      article {
        max-width: 650px;
        margin: auto;
        font-size: 14px;
      }
    `}</style>
  </Page>
)
