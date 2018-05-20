var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Post = require('../models/posts');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("ACcess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  var user = new User(req.body);
  user.save().then(function(){
    if(user.isNew === false){
      res.send(true);
    }
  });
});

router.get('/print', function(req, res){
  res.send('data');
});

router.post('/login', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("ACcess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  var data = req.body;
  User.findOne({enroll: data.enroll}).then(function(result){
    if(data.password === result.password){
      result.password = "";
      res.send(result);
    }else{
      res.send(false);
    }
  });
});

router.post('/postit', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("ACcess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  var post = new Post(req.body);
  post.save().then(function(){
    if(post.isNew === false){
      res.send(true);
    }
  });
});

router.get('/posts', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("ACcess-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  Post.find({}).then(function(result){
    res.send(result);
  });
});

module.exports = router;
