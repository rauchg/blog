import Meta from '../components/meta'
import Link from 'next/prefetch'

export default ({ children }) => (
  <div className="main">
    <div className="logo">
      <Link href="/"><a>Home</a></Link>
      {' '}
      (<a href={`https://github.com/rauchg/blog`} target="_blank">src</a>)
    </div>
    <div className="logo2">
      <Link href="/login"><a>Login</a></Link>
      {' '}
      (<a href={`https://github.com/rauchg/blog`} target="_blank">src</a>)
    </div>

    { children }

    { /* global styles and meta tags */ }
    <Meta />

    { /* local styles */ }
    <style jsx>{`
      .main {
        padding: 25px 50px;
      }

      .logo {
        padding-bottom: 50px;
        width: 50%;
display: inline-block;
      }
.logo2 {
        padding-bottom: 50px;
        width: 50%;
        text-align: right;
display: inline-block;
      }

      a {
        text-decoration: none;
      }

      @media (max-width: 500px) {
        .main {
          padding: 25px 15px;
        }

        .logo {
          padding-bottom: 20px;
        }
      }
    `}</style>
  </div>
)
