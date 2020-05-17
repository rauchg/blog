import Logo from "./logo";
import Link from "next/link";

export default () => (
  <header>
    <Link href="/">
      <a className="logo" href="/">
        <Logo />
      </a>
    </Link>

    <nav>
      <a className="src" target="_blank" href="https://github.com/rauchg/blog">
        Source
      </a>
      <a className="follow" target="_blank" href="https://twitter.com/rauchg">
        Follow Me
      </a>
    </nav>

    <style jsx>{`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      nav {
        padding: 10px 0 10px 5px;
      }

      nav a {
        padding: 6px 10px;
        display: inline-block;
        text-decoration: none;
        margin-right: 15px;
      }

      nav a.src {
        font-size: 13px;
        color: #333;
      }

      nav a.follow {
        font-weight: bold;
        color: #fff;
        background: #000;
        font-size: 13px;
      }

      a.logo {
        text-decoration: none;
        color: #000;
        display: inline-flex;
        transition: 150ms background-color ease;
        padding: 5px;
      }

      @media (any-hover: hover) {
        a.logo:hover {
          background-color: var(--link-highlight);
        }

        a.logo:active {
          background-color: #fff445;
        }
      }

      @media (min-width: 500px) {
        header {
          max-width: 42rem;
          margin: auto;
          padding: 10px 0;
        }

        nav {
          padding: 0;
        }
      }
    `}</style>
  </header>
);
