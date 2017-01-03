import Page from '../layouts/main'
import Link from 'next/prefetch'
import { posts } from '../posts'
import Head from 'next/head'

export default () => (
  <Page>
    <Head>
      <title>Essays</title>
    </Head>
    <div className="posts">
      {
        posts.map(({ id, date, title }) => (
          <Post 
            id={id}
            key={id}
            date={date}
            title={title}
          />
        ))
      }
    </div>
  </Page>
)

const Post = ({ id, date, title }) => (
  <div className="post">
    <span className="date">{ date }</span>
    <Link href={`/${new Date(date).getFullYear()}/${id}`}><a>{ title }</a></Link>

    <style jsx>{`
      .post {
        margin-bottom: 10px;
      }

      .date {
        display: inline-block;
        width: 140px;
        text-align: right;
        margin-right: 30px;
        color: #999;
      }

      a {
        text-decoration: none;
      }

      @media (max-width: 500px) {
        .post {
          margin-bottom: 15px;
        }

        .date {
          display: block;
          width: inherit;
          text-align: inherit;
          font-size: 11px;
          color: #ccc;
          margin-bottom: 5px;
        }
      }
    `}</style>
  </div>
)
