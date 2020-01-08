import getCombinedPosts from "./get-combined-posts";
const max = 10; // max returned posts

export default async function atom() {
  const posts = await getCombinedPosts();

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Guillermo Rauch</title>
    <subtitle>Essays</subtitle>
    <link href="https://rauchg.com/atom" rel="self"/>
    <link href="https://rauchg.com/"/>
    <updated>${posts[0].date}</updated>
    <id>https://rauchg.com/</id>
    <author>
      <name>Guillermo Rauch</name>
      <email>rauchg@gmail.com</email>
    </author>
    ${posts.slice(0, max).reduce((acc, post) => {
      return `${acc}
        <entry>
          <id>${post.id}</id>
          <title>${post.title}</title>
          <link href="https://rauchg.com/${post.date.match(/\d{4}/)[0]}/${
        post.id
      }"/>
          <updated>${post.date}</updated>
        </entry>`;
    }, "")}
  </feed>
`;
}
