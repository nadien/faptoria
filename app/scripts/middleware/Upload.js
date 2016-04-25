var express = require('express'),
    fs = require('fs'),
    app = express(),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    multer = require('multer'),
    jwt = require('jsonwebtoken'),
    util = require('util'),
    formidable = require('formidable');
var requestIp = require('request-ip');
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

var imageSchema = new Schema({
    //img: { data: Buffer, contentType: String },
    title : String,
    index : { type : Boolean , default : false },
    tags : { type: String },
    category : {type : String },
    size : {type : String} ,
    uploadDate : {type : Date , default : Date.now},
    path : String,
    votes : { positives : { type : Number , default : 0 } ,
             negatives : { type : Number , default : 0 } },
    id_user : { type : mongoose.Schema.Types.ObjectId, ref : 'User'}
});

/*
var apiRoutes =  express.Router();

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
//  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      token = fields.token;

      console.log(JSON.stringify(files));

    if (token) {
      // verifies secret and checks exp of token
      jwt.verify(token, app.get('gjwtScrt'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Falló la autenticación de token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          if(decoded._doc.role === 1 || decoded._doc.role === 2 || decoded._doc.role === 3){

          var imgPath = files.userPhoto.path;

          var A = mongoose.model('images', schema);

              var a = new A;
             // a.img.data = fs.readFileSync(imgPath);
              a.title = files.userPhoto.name;
              a.path = imgPath;
              a.size = files.userPhoto.size;
             // a.img.contentType = 'image/png';
              a.save(function (err, a) {
                if (err) throw err;

                res.json({
                  success : true,
                imageData : a
                });
                next();
              });

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

});
*/

var upload = multer({ storage : storage}).single('userPhoto');
  var user = mongoose.model('user', imageSchema);

app.post('/api/upload', upload, function(req,res){


  user.findOne({
    _id : req.body.idImage
  }, function(err , user){
      if(err) res.send(err);

      if(!user){
        res.json("Falló la autenticación, usuario incorrecto");
      }else if(user){
        if(req.file != undefined || req.file != null){
        var imgPath = req.file.path;

         var A = mongoose.model('images', imageSchema);

             var a = new A;
            // a.img.data = fs.readFileSync(imgPath);
            console.log(JSON.stringify(req.body))
            a.tags = req.body.tags;
             a.title = req.body.title;
             a.path = imgPath;
             a.size = req.file.size;
             a.id_user = req.body.idImage;
            // a.img.contentType = 'image/png';
             a.save(function (err, a) {
               if (err) throw err;

               res.json({
                 success : true,
               imageData : a
               });
             });
       // return the information including token as JSON

            }else{
              res.json({
                success : false,
                message : "Tienes que subir una imagen o archivo válido"
              });
            }
      }
    });


  /* upload(req,res,function(err){
             if(err){
                  res.json({error_code:1,err_desc:err});
                  return;
             }
              res.json({error_code:req.files });
         }); */


});
var A = mongoose.model('images', imageSchema);
app.post('/api/getPhotos' , function(req , res){

  var a = new A;
  A.find().lean().exec(function(err , image){
          if(err)throw err;

          //res.contentType(doc.img.contentType);
          res.json(image);
      })

});


app.post('/api/getPhoto/:id' , function(req , res){
    var A = mongoose.model('images', imageSchema);
    A.findOne({
      _id : req.params.id
    } , function(err , image){
      if(err) res.send(err);

      res.send(image);

    });

});

app.post('/api/getPhotosModerate' , function(req , res){
 
  var A = mongoose.model('images', imageSchema);
    A.find({
      index : false
    } , function(err , image){
      if(err) res.send(err);

      res.send(image);

    });

});

var apiRoutess =  express.Router();

apiRoutess.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, app.get('gjwtScrt'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falló la autenticación de token.' });
      } else {
        req.decoded = decoded;
        if(decoded._doc.role === 1 || decoded._doc.role === 2){
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


app.delete('/api/delete_photo/:id', apiRoutess, function(req , res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  A.findOneAndRemove({
     _id : req.params.id
   }, function(err , image){
      if(err)
        res.send(err);
        fs.unlinkSync(image.path);
      res.json({
        success : true,
        message : "Se eliminó la imagen correctamente."
      });
  })
});

app.post('/api/approve/:id', apiRoutess, function(req , res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  A.findOneAndUpdate({
    _id : req.params.id
  },{$set : {
   index : true
  }
}, function(err , image){
      if(err)
        res.send(err);
      res.json({
        success : true,
        message : "Se aprobó la imagen."
      });
  })
});


app.post('/api/vote/:id', apiRoutess , function(req , res){
var sum = 0;
 var clientIp = requestIp.getClientIp(req);
      console.log("TU ip : "  + clientIp);
      
  A.findOneAndUpdate({
    _id : req.params.id
  },{$set : {
   votes : {positives : req.body.votePos , negatives  : req.body.voteNeg}
  }
}, function(err , image){
      if(err)
        res.send(err);
      res.json({
        success : true,
        message : "Se voto la imagen."
      });
  })
});
