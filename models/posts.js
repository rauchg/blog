const mongoose = require('mongoose');
Schema = mongoose.Schema;


const PostSchema = new Schema({
	//schema structure will go here.
	name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  }
}, {
	
});


 module.exports = mongoose.model('Posts', PostSchema);

