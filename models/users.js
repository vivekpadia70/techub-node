const mongoose = require('mongoose');
const schema = mongoose.Schema;

var userSchema = new schema({
  enroll: Number,
  password: String,
  username: String,
  year: String,
  profile_pic: String,
  bio: String,
  social_links: Array
});

var User = mongoose.model('user', userSchema);

module.exports = User;
