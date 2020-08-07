import Post from "../../components/layouts/post";
import Header from "../../components/post/header";
import Head from "next/head";
import useIsInViewport from "use-is-in-viewport";
import withViews from "../../lib/with-views";
import P from '../../components/post/paragraph'

import {
  loadPageChunk,
  queryCollection,
  getCollectionSchemaNameIndex
} from '../../lib/notion'

export async function getStaticProps() {
  const { recordMap: { collection, collection_view } } = await loadPageChunk({
    pageId: "fa0a337c-3807-4aa9-b30f-dddc6ef4ec2e",
    chunkNumber: 0,
    limit: 50,
    verticalColumns: false,
    cursor: {stack: [[{table: "block", id: "fa0a337c-3807-4aa9-b30f-dddc6ef4ec2e", index: 0}]]}
  })

  const [collectionId] = Object.keys(collection);
  const [collectionViewId] = Object.keys(collection_view);
  const collectionSchema = getCollectionSchemaNameIndex(collection[collectionId].value.schema)

  const col = await queryCollection({
    collectionId,
    collectionViewId,
    query:{
      sort: [{property: collectionSchema.Votes, direction: "descending"}],
      aggregations: [{property: "title", aggregator: "count"}]
    },
    loader: {
      type: "table",
      limit: 1000,
      searchQuery: "",
      userTimeZone: "America/Los_Angeles",
      userLocale: "en",
      loadContentCover: false
    }
  })

  function toPlainText (val) {
    return val[0].map(v => {
      if (typeof v === 'string') {
        return v;
      } else if (Array.isArray(v)) {
        // if it's bold or something else
        return v[1];
      }
    }).join(' ').trim()
  }

  return {
    props: {
      books: col.result.blockIds.map(blockId => {
        const blockData = col.recordMap.block[blockId];
        
        if (blockData) {
          const props = blockData.value.properties;

          if (!props) {
            // not sure when this happens yet, but it seems
            // to be limited to only one row
            // console.info('missing props for block', blockId);
            return null;
          }

          // the props are named with unique ids, but
          // we want to return them with easily addressable
          // column names
          const indexedData = {};
          for (const key in collectionSchema) {
            indexedData[key] = props[collectionSchema[key]];
          }
          return indexedData;
        } else {
          console.warn(`missing block data for "${blockId}"`);
          return null;
        }
      })
      // sanitize notion data
      .map(book => {
        if (!book) return null;

        book.URL = toPlainText(book.URL);
        book.Image = book.Image ? toPlainText(book.Image) : null;

        const ASIN = book.URL.match(/dp\/(.*)\/?$/);
        if (ASIN) {
          book.ASIN = ASIN[1];
        }

        book.Name = toPlainText(book.Name);

        // sanitize vote count, since many are undefined
        book.Votes = Number(book.Votes);
        if (isNaN(book.Votes)) {
          book.Votes = 1;
        }

        return book;
      })
      .filter(v => v != null) 
    },
    revalidate: 1
  }
}

const Page = withViews(({ tweets, views, books }) => (
  <>
  <Post tweets={tweets}>
    <Header title="Books people (re)read" date="August 2, 2020" timestamp="2020-08-03T01:38:52.500Z" views={views} />
    <Head>
      <meta property="og:title" content="Books people (re)read" />
      <meta property="og:site_name" content="Guillermo Rauch's blog" />
      <meta
        property="og:description"
        content="What books do people read more than once? That's what I asked on Twitter, which created an epic reading list"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rauchg" />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/rauchg/image/upload/v1596418125/blog/og/26ED5322-8782-4B58-BDA1-43FC2018508F_ud9syf.png"
      />
    </Head>

    <P>
      Last night I <a href="https://twitter.com/rauchg/status/1289761175253602305" target="_blank">asked a question</a> on Twitter: what books have you read more than once?
    </P>

    <P>
      As it turns out, it turned into a wonderful way of crowdsourcing a compelling reading list from quite a few thoughtful people.
    </P>

    <P>
      I took the opportunity to <a href="https://www.notion.so/rauchg/fa0a337c38074aa9b30fdddc6ef4ec2e" target="_blank">dump the data on Notion</a> and write a Next.js page using the new stable <a href="https://nextjs.org/blog/next-9-5#stable-incremental-static-regeneration" target="_blank">Incremental Static Regeneration</a> to produce this list and keep it up to date automatically.
    </P>

    <P>Here are all the books, sorted by how frequently they were suggested.</P>
  </Post>

  <div className="books">
    {
      books.map(book => {
        return <Book key={book.URL} {...book} />
      })
    }

    <style jsx>{`
      .books {
        padding: 0 25px;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
    `}</style>
  </div>
  </>
));

function Book({ URL, Name, Image, ASIN, Votes }) {
  let isInViewport, targetRef;

  if (typeof IntersectionObserver != "undefined") {
    [isInViewport, targetRef] = useIsInViewport({
      modTop: "500px",
      modBottom: "500px",
    });
  }

  return <main ref={targetRef}>
    <a href={URL} target="_blank">
      <span className="image" style={{
        backgroundImage: isInViewport ? `url(${Image ||
          `https://images-na.ssl-images-amazon.com/images/P/${ASIN}._LZZZZZZZ_.jpg`
        })` : ''
      }} />
      <span className="title">
        { Name }
        {
          Votes > 1 ?
            <span className="votes">🔥 { Votes }</span> : null
        }
      </span>
    </a>

    <style jsx>{`
      main, main a {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #eee;
      }

      main a {
        padding: 10px;
        text-align: center;
        text-decoration: none;
      }

      .image {
        display: block;
        width: 160px;
        height: 250px;
        background-size: cover;
        margin-bottom: 10px;
      }

      .votes {
        text-decoration: none;
        background: blue;
        color: #fff;
        font-size: 12px;
        margin-left: 10px;
        padding: 3px;
      }
    `}</style>
  </main>
}

export default Page;
