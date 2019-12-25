import Page from '../layouts/main'
import Link from 'next/link'
import Head from 'next/head'

export default () => (
  <Page>
    <Head>
      <title>Guillermo Rauch</title>
    </Head>

    <div className="home">
      <div className="main">
        <h1>Guillermo Rauch</h1>
        <nav>
          <a target="_blank" href="https://twitter.com/rauchg">Twitter</a>
          <Link href="/essays"><a>Essays</a></Link>
          <a href="/gpg.asc" download>GPG</a>
          <a href="mailto:rauchg@gmail.com">Email</a>
        </nav>
      </div>
    </div>

    <style jsx>{`
      .home {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: -1;
      }

      .main {
        flex: none;
        text-align: center;
      }

      h1 {
        font-size: 14px;
        font-weight: normal;
      }

      nav {
        margin-top: 20px;
      }

      a {
        display: inline-block;
        margin: 0 15px;
        text-decoration: none;
      }
    `}</style>
  </Page>
)
