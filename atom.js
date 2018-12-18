const atom = require("./lib/atom");

module.exports = (req, res) => {
  const body = atom();
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Content-Length", Buffer.byteLength(body));
  res.end(body);
};
