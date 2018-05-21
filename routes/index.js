var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Post = require('../models/posts');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res){
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
  var post = new Post(req.body);
  post.save().then(function(){
    if(post.isNew === false){
      res.send(true);
    }
  });
});

router.get('/posts', function(req, res){
  Post.find({}).then(function(result){
    res.send(result);
  });
});

router.get('/useren/:enroll', function(req, res){
  var enrollment = req.param('enroll');
  console.log(enrollment);
  User.findOne({enroll: enrollment}).then(function(result){
    res.send(result);
    console.log(result);
  });
});

module.exports = router;
