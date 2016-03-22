var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var Schema = mongoose.Schema;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//..localhost/[name] <-- indica la base de datos a usar en mongdb
mongoose.connect('mongodb://localhost/faptoria');

app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

  var articles = mongoose.model('articles' , {
    title : String,
    filename : String,
    tags : [{ tag : String }],
    url : String
  });

  var Users = mongoose.model('Users' , {
    nickname : String ,
  });

  var News = mongoose.model('News' , {
    title : String,
    content : String
  });


  var ImageController = new Schema({
      imageID: { type: String, index: { unique: true }},
      mime:  String,
      image : Buffer,
      uses : [{type: Schema.Types.ObjectId}]
  });

  app.post('/upload', function(req, res) {

    ImageController.create({image: new Buffer(req.body.image, "base64")},
      function(err, img) {
          if(err) { return handleError(res, err); }
          return res.status(201).json(img);
      }
    );

  /*  fs.readFile(req.files.image.path, function (err, data) {
      var imageName = req.files.image.name
      // If there's an error
      if(!imageName){
        console.log("There was an error")
        res.redirect("/");
        res.end();
      } else {
        var newPath = __dirname + "/uploads/fullsize/" + imageName;
        // write file to uploads/fullsize folder
        fs.writeFile(newPath, data, function (err) {
          // let's see it
          res.redirect("/uploads/fullsize/" + imageName);
        });
      }
    }); */
  });

  // Show files
  app.get('/uploads/:file', function (req, res){
    file = req.params.file;
    var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  });



app.get('/api/get' , function(req, res){

      articles.find(function(err, arti) {
           if (err)
               res.send(err)

           res.json(arti); // return all todos in JSON format
       });

   });

app.post('/api/post', function(req, res) {

      articles.create({
           title : req.body.text,
           done : false
         }, function(err, arti) {
           if (err)
               res.send(err);

           articles.find(function(err, arti) {
               if (err)
                   res.send(err)
               res.json(arti);
           });
       });

   });


app.listen(process.env.PORT || 9999 , function(port){
  console.log('Corriend en puerto 9999');
});
