const mongoose = require('mongoose');

mongoose.connect('mongodb://vivekpadia70:loriel70@ds123500.mlab.com:23500/techub');

mongoose.connection.once('open', function(){
  console.log('connection established');
}).on('error', function(error){
  console.log('Error: ', error);
});
