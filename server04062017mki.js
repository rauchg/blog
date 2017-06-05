'use strict'

const express = require('express')
const bodyParser= require('body-parser')
const expserve = express()
const { MongoClient } = require('mongodb')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const atom = require('./lib/atom')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

MongoClient.connect('mongodb://elTel:elTel1000@ds161551.mlab.com:61551/star-wars-quotes', (err, database) => {
  // ... start the server
db = database
  expserve.listen(3000, function() {
  console.log('listening on 3000')
})  
})

expserve.set('view engine', 'ejs')
expserve.use(bodyParser.urlencoded({extended: true}))

expserve.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})
// Note: request and response are usually written as req and res respectively.

expserve.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

expserve.prepare()
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
