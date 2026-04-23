import Image from "next/image";
import {
  loadPageChunk,
  getRecordValues,
  getCollectionSchemaNameIndex,
} from "./notion";

export async function Books() {
  const books = await getData();
  return (
    <div className="books grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-10 px-5 mb-10">
      {books.map((book, i) => (
        <Book key={book.URL} priority={i < 10} {...book} />
      ))}
    </div>
  );
}

async function getData() {
  const {
    recordMap: { collection, collection_view },
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
  const collectionSchema: any = getCollectionSchemaNameIndex(
    collection[collectionId].value.value.schema
  );

  const [viewId] = Object.keys(collection_view);
  const blockIds: string[] =
    collection_view[viewId].value.value.page_sort ?? [];

  const { results } = await getRecordValues({
    requests: blockIds.map(id => ({
      table: "block",
      id,
    })),
  });

  const blocks: Record<string, any> = {};
  for (const result of results) {
    if (result?.value) {
      blocks[result.value.id] = result;
    }
  }

  function toPlainText(val) {
    return val[0]
      .map(v => {
        if (typeof v === "string") {
          return v;
        } else if (Array.isArray(v)) {
          return v[1];
        }
      })
      .join(" ")
      .trim();
  }

  return blockIds
    .map(blockId => {
      const blockData = blocks[blockId];
      if (!blockData) {
        console.warn(`missing block data for "${blockId}"`);
        return null;
      }

      const props = blockData.value?.value?.properties ?? blockData.value?.properties;
      if (!props) return null;

      const indexedData: any = {};
      for (const key in collectionSchema) {
        indexedData[key] = props[collectionSchema[key]];
      }
      return indexedData;
    })
    .map(book => {
      if (!book) return null;

      book.URL = toPlainText(book.URL);
      book.Image = book.Image ? toPlainText(book.Image) : null;

      const ASIN = book.URL.match(/dp\/(.*)\/?$/);
      if (ASIN) {
        book.ASIN = ASIN[1];
      }

      book.Name = toPlainText(book.Name);

      book.Votes = Number(book.Votes);
      if (isNaN(book.Votes)) {
        book.Votes = 1;
      }

      return book;
    })
    .filter(Boolean) as any[];
}

function Book({ URL, Name, Image: ImageURL, ASIN, Votes, priority = false }) {
  return (
    <main className="text-sm flex flex-col items-center bg-neutral-100 dark:bg-[#333]">
      <a
        href={URL}
        target="_blank"
        className="flex flex-col items-center p-4 text-center"
      >
        <span className="w-40 h-60 bg-center bg-cover mb-2 relative">
          <Image
            alt={Name}
            fill
            style={{ objectFit: "contain" }}
            priority={priority}
            src={
              ImageURL ||
              `https://images-na.ssl-images-amazon.com/images/P/${ASIN}._LZZZZZZZ_.jpg`
            }
          />
        </span>
        <span className="flex flex-row items-center">
          <span className="inline-block font-medium">{Name}</span>
          {Votes > 1 && (
            <span className="inline-block text-neutral-800 bg-neutral-200 dark:bg-[#222] dark:text-white text-xs py-1 px-2 ml-2 rounded-full whitespace-nowrap">
              🔥 {Votes}
            </span>
          )}
        </span>
      </a>
    </main>
  );
}
