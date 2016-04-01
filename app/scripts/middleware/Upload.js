var express = require('express'),
    fs = require('fs'),
    app = express(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var imgPath = '/Users/apei/Documents/Shop/uploads/userPhoto-1459554027558.jpg';

// connect to mongo
//mongoose.connect('localhost', 'testing_storeImg');
module.exports = app;
// example schema
var schema = new Schema({
    img: { data: Buffer, contentType: String }
});

// our model
var A = mongoose.model('A', schema);


  console.error('mongo is open');

  // empty the collection
    // store an img in binary in mongo
    var a = new A;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/png';
    a.save(function (err, a) {
      if (err) throw err;

      console.error('saved img to mongo');
    });
