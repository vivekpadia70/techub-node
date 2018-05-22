var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  owner_enroll: Number,
  content: String,
  likes: Array,
  date: Date,
  profile_pic: String
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;
