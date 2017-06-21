'use strict'

const Posts = require('../models/posts');

exports.createPost = function(req, res, next) {
	const name = req.body.name;
  const email = req.body.email;
  const post = req.body.post;

if (!name) {
    return res.status(422).send({ error: 'You must enter a name!'});
  }

  if (!email) {
    return res.status(422).send({ error: 'You must enter your email!'});
  }

  if (!post) {
    return res.status(422).send({ error: 'You must enter something'});
  }

let post = new Posts({
	  name: name,
    email: email,
    status: "Open",
    post: post
});

post.save(function(err, user) {
	if(err) {return next(err):}
	
	res.status(201).json({ message: "Your post has been submitted!"});
	
	next();
	})
}