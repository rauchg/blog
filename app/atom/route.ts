import { getPosts } from "@/app/get-posts";

function formatDate(inputDate: string): string {
    const dateObject: Date = new Date(inputDate);
    
    const formattedDate: string = dateObject.toISOString().slice(0, 19) + ".00Z";
    
    return formattedDate;
}

export async function GET() {
  const posts = await getPosts();
  const max = 100; // max returned posts
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Guillermo Rauch</title>
    <subtitle>Essays</subtitle>
    <link href="https://rauchg.com/atom" rel="self"/>
    <link href="https://rauchg.com/"/>
    <updated>${formatDate(posts[0].date)}</updated>
    <id>https://rauchg.com/</id>
    <author>
      <name>Guillermo Rauch</name>
      <email>rauchg@gmail.com</email>
    </author>
    ${posts.slice(0, max).reduce((acc, post) => {
      const dateMatch = post.date.match(/\d{4}/);
      if (!dateMatch) return "";
      return `${acc}
        <entry>
          <id>https://rauchg.com/${dateMatch[0]}/${post.id}</id>
          <title>${post.title}</title>
          <link href="https://rauchg.com/${dateMatch[0]}/${post.id}"/>
          <updated>${formatDate(post.date)}</updated>
        </entry>`;
    }, "")}
  </feed>`,
    {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    }
  );
}
