const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const atom = require('./lib/atom')
const gpgKey = require('fs').readFileSync('./gpg.asc');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  createServer((req, res) => {
    const { pathname } = parse(req.url)

    if (/^\/slackin\/?$/.test(pathname)) {
      res.writeHead(302, {
        Location: 'https://github.com/rauchg/slackin'
      })
      res.end()
      return
    }

    if (/^\/\d{4}\/.+\/$/.test(pathname)) {
      // wordpress used to link to posts with a
      // trailing slash, that would 404 in next
      // so we redirect them to without
      res.writeHead(301, {
        Location: pathname.substr(0, pathname.length - 1)
      })
      res.end()
      return
    }

    if ('/gpg.asc' === pathname) {
      const body = gpgKey;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.end(body);
      return;
    }

    if(/^\/atom\/?$/.test(pathname)) {
      const body = atom();
      res.setHeader('Content-Type', 'text/xml');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.end(body);
      return
    }

    handle(req, res)
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
