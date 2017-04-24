const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const atom = require('./lib/atom')

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

    if(/^\/atom\/?$/.test(pathname)) {
      res.setHeader('Content-Type','text/xml')
      res.end(atom())
      return
    }

    handle(req, res)
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
