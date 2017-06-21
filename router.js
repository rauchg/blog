//server router.js

//import dependencies
const express = require('express'),

// import controllers
const _postController = require('./controllers/_post-control');

module.exports = function(app) {

  const postRoutes = express.Router();

//==================
// TICKET ROUTES
//==================
  apiRoutes.use('/posts', postRoutes);

  postRoutes.post('/create-new-post', requireAuth, _ticketController.createPost);

  app.use('/api', apiRoutes);
}