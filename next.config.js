const nextra = require("nextra");

module.exports = nextra("./components/layouts/nextra-post-layout")({
  images: {
    domains: ["pbs.twimg.com"],
  },
  i18n: {
    locales: ["en", "ru", "ja"],
    defaultLocale: "en",
  },
  headers() {
    return [
      {
        source: "/atom/:nested*",
        headers: [
          {
            key: "content-type",
            value: "text/xml",
          },
        ],
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/essays/:nested*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/slackin/:nested*",
        destination: "https://github.com/rauchg/slackin",
        permanent: true,
      },
    ];
  },
});
