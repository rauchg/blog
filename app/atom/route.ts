import { getPosts } from "@/app/get-posts";

export async function GET() {
  const posts = await getPosts();
  const max = 100; // max returned posts
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Michael Adeyeri</title>
    <subtitle>Essays</subtitle>
    <link href="https://michaeladeyeri.com/atom" rel="self"/>
    <link href="https://michaeladeyeri.com/"/>
    <updated>${posts[0].date}</updated>
    <id>https://michaeladeyeri.com/</id>
    <author>
      <name>Michael Adeyeri</name>
      <email>michael@michaeladeyeri.com</email>
    </author>
    ${posts.slice(0, max).reduce((acc, post) => {
      const dateMatch = post.date.match(/\d{4}/);
      if (!dateMatch) return "";
      return `${acc}
        <entry>
          <id>${post.id}</id>
          <title>${post.title}</title>
          <link href="https://michaeladeyeri.com/${dateMatch[0]}/${post.id}"/>
          <updated>${post.date}</updated>
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
