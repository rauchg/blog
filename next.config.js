const nextra = require("nextra");

module.exports = nextra("./components/layouts/nextra-post-layout")({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "pbs.twimg.com",
      "abs.twimg.com",
      "m.media-amazon.com",
      "images-na.ssl-images-amazon.com",
      "avatar.tobi.sh",
    ],
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
