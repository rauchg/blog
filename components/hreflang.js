import Head from "next/head";

export default function Hreflang({ links, defaultUrl }) {
  return (
    <Head>
      {links.map(({ url, lang }) => (
        <link rel="alternate" href={url} hrefLang={lang} key={lang} />
      ))}
      <link rel="alternate" href={defaultUrl} hrefLang="x-default" />
      <link rel="alternate" href={defaultUrl} hrefLang="en" />
    </Head>
  );
}
