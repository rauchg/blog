import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = "ed95c702-dabc-498a-9186-e8ff4719ecc0";

export async function queryBooks() {
  const results: any[] = [];
  let cursor: string | undefined = undefined;

  // Paginate through all results
  do {
    const response: any = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: "Votes",
          direction: "descending",
        },
      ],
      start_cursor: cursor,
      page_size: 100,
    });

    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return results;
}
