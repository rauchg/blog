import Post from "../../components/layouts/post";
import P from "../../components/post/paragraph";
import Image from "next/image";

import {
  loadPageChunk,
  queryCollection,
  getCollectionSchemaNameIndex,
} from "../../lib/notion";

export async function getStaticProps() {
  const {
    recordMap: { collection },
  } = await loadPageChunk({
    pageId: "fa0a337c-3807-4aa9-b30f-dddc6ef4ec2e",
    chunkNumber: 0,
    limit: 50,
    verticalColumns: false,
    cursor: {
      stack: [
        [
          {
            table: "block",
            id: "fa0a337c-3807-4aa9-b30f-dddc6ef4ec2e",
            index: 0,
          },
        ],
      ],
    },
  });

  const [collectionId] = Object.keys(collection);
  const collectionSchema = getCollectionSchemaNameIndex(
    collection[collectionId].value.schema
  );

  const col = await queryCollection({
    collection: {
      id: "ed95c702-dabc-498a-9186-e8ff4719ecc0",
      spaceId: "7e95f31d-c9d4-4799-ac66-847d56344ef2",
    },
    collectionView: {
      id: "29294b4b-7b0f-405f-8f5e-af4454c258a2",
      spaceId: "7e95f31d-c9d4-4799-ac66-847d56344ef2",
    },
    loader: {
      type: "reducer",
      reducers: {
        collection_group_results: { type: "results", limit: 1000 },
        "table:uncategorized:title:count": {
          type: "aggregation",
          aggregation: { property: "title", aggregator: "count" },
        },
      },
      sort: [{ property: collectionSchema.Votes, direction: "descending" }],
      searchQuery: "",
      userTimeZone: "America/Los_Angeles",
    },
  });

  function toPlainText(val) {
    return val[0]
      .map(v => {
        if (typeof v === "string") {
          return v;
        } else if (Array.isArray(v)) {
          // if it's bold or something else
          return v[1];
        }
      })
      .join(" ")
      .trim();
  }

  return {
    props: {
      books: col.result.reducerResults.collection_group_results.blockIds
        .map(blockId => {
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
        .filter(v => v != null),
    },
    revalidate: 60,
  };
}

const Page = ({ tweets, views, books }) => (
  <>
    <Post
      id="books-people-reread"
      tweets={tweets}
      title="Books people (re)read"
      date="August 2, 2020"
      description="What books do people read more than once? That's what I asked on Twitter, which created an epic reading list"
      og="https://res.cloudinary.com/rauchg/image/upload/v1596418125/blog/og/26ED5322-8782-4B58-BDA1-43FC2018508F_ud9syf.png"
    >
      <P>
        Last night I{" "}
        <a
          href="https://twitter.com/rauchg/status/1289761175253602305"
          target="_blank"
        >
          asked a question
        </a>{" "}
        on Twitter: what books have you read more than once?
      </P>

      <P>
        As it turns out, it turned into a wonderful way of crowdsourcing a
        compelling reading list from quite a few thoughtful people.
      </P>

      <P>
        I took the opportunity to{" "}
        <a
          href="https://www.notion.so/rauchg/fa0a337c38074aa9b30fdddc6ef4ec2e"
          target="_blank"
        >
          dump the data on Notion
        </a>{" "}
        and write a Next.js page using the new stable{" "}
        <a
          href="https://nextjs.org/blog/next-9-5#stable-incremental-static-regeneration"
          target="_blank"
        >
          Incremental Static Regeneration
        </a>{" "}
        to produce this list and keep it up to date automatically.
      </P>

      <P>
        Here are all the books, sorted by how frequently they were suggested.
      </P>
    </Post>

    <div className="books">
      {books.map(book => {
        return <Book key={book.URL} {...book} />;
      })}

      <style jsx>{`
        .books {
          padding: 0 25px;
          margin: 0 0 40px;
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
      `}</style>
    </div>
  </>
);

function Book({ URL, Name, Image: ImageURL, ASIN, Votes }) {
  return (
    <main>
      <a href={URL} target="_blank">
        <span className="image">
          <Image
            alt={Name}
            fill
            style={{ objectFit: "contain" }}
            src={
              ImageURL ||
              `https://images-na.ssl-images-amazon.com/images/P/${ASIN}._LZZZZZZZ_.jpg`
            }
          />
        </span>
        <span className="title">
          {Name}
          {Votes > 1 ? <span className="votes">🔥 {Votes}</span> : null}
        </span>
      </a>

      <style jsx>{`
        main,
        main a {
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
          position: relative;
        }

        .votes {
          text-decoration: none;
          background: blue;
          color: #fff;
          font-size: 12px;
          margin-left: 10px;
          padding: 3px;
          white-space: nowrap;
        }
      `}</style>
    </main>
  );
}

export default Page;
