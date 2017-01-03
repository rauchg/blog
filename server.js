// deps
const express = require('express')
const next = require('next')

// data
const { posts } = require('./posts')
const posts_ = {}
posts.forEach(({ id }) => posts_[id] = true)

// init
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
    const id = req.path.substr(1)

    if (posts_[id]) {
      app.render(req, res, `/posts/${id}`, req.query)
    } else {
      handle(req, res)
    }
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
