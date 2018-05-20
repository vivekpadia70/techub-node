var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  owner_enroll: Number,
  content: String,
  likes: Number
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;
