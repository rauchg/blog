const path = require("path");
const gpgKey = require("fs").readFileSync(path.join(__dirname, "gpg.asc"));

module.exports = (req, res) => {
  const body = gpgKey;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Length", Buffer.byteLength(body));
  res.end(body);
};
