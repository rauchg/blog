import Layout from "../components/layouts/main";
import Link from "next/link";
import { WRITINGS } from "../components/header";
import getCombinedPosts from "../lib/get-combined-posts";

export async function unstable_getStaticProps() {
  return {
    props: {
      posts: await getCombinedPosts()
    }
  };
}

const Home = ({ posts }) => (
  <Layout headerActive={WRITINGS}>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <span>{post.date}</span>
          <Link href={post.notion ? "[...slug]" : post.url} as={post.url}>
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

      ul li a:hover {
        background: #eee;
      }

      @media (min-width: 500px) {
        ul {
          padding: 20px 0;
        }

        ul li a {
          padding: 10px 15px;
          transition: 150ms background-color ease-in;
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
