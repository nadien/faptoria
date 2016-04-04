var express = require('express'),
    fs = require('fs'),
    app = express(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    multer = require('multer');

module.exports = app;

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    nameFile = file.path;
    callback(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});
var upload = multer({ storage : storage}).single('userPhoto');



// example schema
var schema = new Schema({
    //img: { data: Buffer, contentType: String },
    title : String,
    index : { type : Boolean , default : false },
    tags : { type: String },
    category : {type : String },
    size : {type : String} , 
    uploadDate : {type : Date , default : Date.now},
    path : String,
    votes : { positives : Number , negatives : Number }

});

app.post('/api/upload',  upload , function(req,res){
console.log(req.file);

var imgPath = req.file.path;
res.send(req.file);


var A = mongoose.model('images', schema);
  
    var a = new A;
   // a.img.data = fs.readFileSync(imgPath);
    a.title = req.file.originalname;
    a.path = imgPath;
    a.size = req.file.size; 
   // a.img.contentType = 'image/png';
    a.save(function (err, a) {
      if (err) throw err;

      res.end('saved img to mongo');
    });
  
});

app.post('/api/getPhotos' , function(req , res){
  var A = mongoose.model('images', schema);
  var a = new A;
  console.log("Funciona");
  A.find().lean().exec(function(err , image){
          if(err)throw err;
          
          //res.contentType(doc.img.contentType);
          res.send(image);
      })

});

app.post('/api/getPhoto/:id' , function(req , res){
    var A = mongoose.model('images', schema);
    A.findOne({
      _id : req.params.id
    } , function(err , image){
      if(err) res.send(err);

      res.send(image);

    });

});


/*

 A.findById(a, function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });

*/