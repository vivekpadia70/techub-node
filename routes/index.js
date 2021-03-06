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

router.get('/likePost/:enroll/:id', function(req, res){
  var id = req.param('id');
  var enrollment = req.param('enroll');
  Post.update({_id: id}, {$push: {likes: enrollment}}).then(function(result){
    res.send(result);
  });
});

router.get('/dislike/:enroll/:id', function(req, res){
  var id = req.param('id');
  var enrollment = req.param('enroll');
  Post.update({_id: id}, {$pull: { likes: enrollment}}).then(function(result){
    res.send(result);
  });
});

router.post('/postit', function(req, res){
  var post = new Post(req.body);
  post.save().then(function(){
    if(post.isNew === false){
      res.send(true);
    }
  });
  User.update({enroll: post.owner_enroll}, {$push: {myPosts: post}}).then(function(result){
    res.send(result);
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
  });
});

router.get('/getFriends/:enroll', function(req, res){
  var enroll = req.param('enroll');
  User.findOne({enroll: enroll}).then(function(result){
    res.send(result.friends);
  });
});

router.get('/notifications/:enroll', function(req, res){
  var enroll = req.param('enroll');
  User.findOne({enroll: enroll}).then(function(result){
    res.send(result);
  });
});

router.post('/sendReq', function(req, res){
  var data = req.body;
  var sender = data.sender;
  var receiver = data.receiver;
  User.update({enroll: sender}, {$push: {requestedTo: receiver}}).then(function(result){
    res.send(result);
  });
  User.update({enroll: receiver}, {$push: {requestsFrom: sender}}).then(function(result){
    res.send(result);
  });
});

router.post('/acceptReq', function(req, res){
  var data = req.body;
  var sender = data.sender;
  var receiver = data.receiver;
  User.update({enroll: sender}, {$push: {friends: receiver}}).then(function(result){
    res.send(result);
  });
  User.update({enroll: receiver}, {$push: {friends: sender}}).then(function(result){
    res.send(result);
  });
  User.update({enroll: receiver}, {$pull: {requestedTo: sender}}).then(function(result){
    res.send(result);
  });
  User.update({enroll: sender}, {$pull: {requestsFrom: receiver}}).then(function(result){
    res.send(result);
  });
});

router.post('/cancelReq', function(req, res){
  var data = req.body;
  var sender = data.sender;
  var receiver = data.receiver;
  User.update({enroll: sender}, {$pull: {requestsFrom: receiver}}).then(function(result){
    res.send(result);
  });
  User.update({enroll: receiver}, {$pull: {requestedTo: sender}}).then(function(result){
    res.send(result);
  });
});

router.post('/delReq', function(req, res){
  var data = req.body;
  var sender = data.sender;
  var receiver = data.receiver;
  User.update({enroll: sender}, {$pull: {friends: receiver}}).then(function(result){
    res.send(result);
  });
  User.update({enroll: receiver}, {$pull: {friends: sender}}).then(function(result){
    res.send(result);
  });
});

module.exports = router;
