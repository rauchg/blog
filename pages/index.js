import Layout from "../components/layouts/main";
import Link from "next/link";
import { posts } from "../posts";
import { WRITINGS } from "../components/header";

export function unstable_getStaticProps() {
  return {
    props: {
      posts: posts.map(post => ({
        ...post,
        url: `${new Date(post.date).getFullYear()}/${post.id}`
      }))
    }
  };
}

const Home = ({ posts, date }) => (
  <Layout headerActive={WRITINGS}>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <span>{post.date}</span>
          <Link href={post.url}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>

    <style jsx>{`
      ul li {
        padding: 10px 15px;
      }

      ul li span {
        color: #5b5b5b;
        display: block;
        font-size: 13px;
      }

      ul li a {
        font-weight: bold;
        color: var(--link-color);
        text-decoration: none;
      }

      @media (min-width: 500px) {
        ul {
          padding: 20px 0;
        }

        ul li a {
          padding: 10px 15px;
          transition: 150ms background-color ease-in;
        }

        ul li a:hover {
          background: #eee;
        }

        ul li span {
          display: inline-block;
          width: 160px;
          padding-right: 10px;
          text-align: right;
          font-size: inherit;
        }
      }
    `}</style>
  </Layout>
);

export default Home;
