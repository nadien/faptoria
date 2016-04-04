var express = require('express'),
    fs = require('fs'),
    app = express(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    multer = require('multer'),
    jwt = require('jsonwebtoken');

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

var apiRoutes =  express.Router();

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];



console.log("------------------ "  +  JSON.stringify(req.form.formUpload) +  " ----------------------");
  // decode token
  if (token) {
    // verifies secret and checks exp of token
    jwt.verify(token, app.get('gjwtScrt'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falló la autenticación de token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        if(decoded._doc.role === 1 || decoded._doc.role === 2 || decoded._doc.role === 3){
        next();
      } else{
        res.send("No tienes permisos para hacer esta petición");
      }
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No hay token.'
    });

  }
});

var upload = multer({ storage : storage}).single('userPhoto');
app.post('/api/upload',  apiRoutes, function(req,res){


console.log(req.file)
var imgPath = req.file.path;

var A = mongoose.model('images', schema);

    var a = new A;
   // a.img.data = fs.readFileSync(imgPath);
    a.title = req.file.originalname;
    a.path = imgPath;
    a.size = req.file.size;
   // a.img.contentType = 'image/png';
    a.save(function (err, a) {
      if (err) throw err;

      res.json({
        success : true,
      imageData : a
      });
    });

});

app.post('/api/getPhotos' , function(req , res){
  var A = mongoose.model('images', schema);
  var a = new A;
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
