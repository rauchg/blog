import Image from "next/image";
import { queryBooks } from "./notion";

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

function getPlainText(property: any): string {
  if (!property) return "";

  switch (property.type) {
    case "title":
      return property.title.map((t: any) => t.plain_text).join("") || "";
    case "rich_text":
      return property.rich_text.map((t: any) => t.plain_text).join("") || "";
    case "url":
      return property.url || "";
    case "number":
      return String(property.number ?? "");
    default:
      return "";
  }
}

async function getData() {
  const results = await queryBooks();

  return results
    .map((page: any) => {
      const props = page.properties;
      if (!props) return null;

      const name = getPlainText(props.Name);
      const url = getPlainText(props.URL);
      const image = getPlainText(props.Image) || null;
      const votesRaw = props.Votes?.number;
      const votes = typeof votesRaw === "number" && !isNaN(votesRaw) ? votesRaw : 1;

      if (!url) return null;

      const asinMatch = url.match(/dp\/(.*)\/?$/);
      const asin = asinMatch ? asinMatch[1] : null;

      return {
        Name: name,
        URL: url,
        Image: image,
        ASIN: asin,
        Votes: votes,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v != null);
}

function Book({
  URL,
  Name,
  Image: ImageURL,
  ASIN,
  Votes,
  priority = false,
}: {
  URL: string;
  Name: string;
  Image: string | null;
  ASIN: string | null;
  Votes: number;
  priority?: boolean;
}) {
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
              {"🔥"} {Votes}
            </span>
          )}
        </span>
      </a>
    </main>
  );
}
