var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    multer = require('multer'),
    Schema = mongoose.Schema;

    //..localhost/[name] <-- indica la base de datos a usar en mongdb
    mongoose.connect('mongodb://localhost/faptoria');

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(express.static(__dirname + '/app'));
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));
 app.get('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/app/index.html', { root: __dirname });
});
  /*  app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    }); */

//Iniciando el servidor de imagenes con Multer
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error subiendo el archivo.");
		}
		res.end("File is uploaded");
	});
});

var User = mongoose.model( 'User' , {
  email : String ,
  nick : String ,
  pass : String ,
  role : { type:Number, default:3}
});
app.post('/api/signup' , function(req , res){
   User.create({
     email : req.body.email,
     nick : req.body.nick,
     pass : req.body.password

  }, function(err , users){
    if(err)throw err;

    res.json(users);
  })

});


app.listen(process.env.PORT || 9999 , function(port){
  console.log('Corriend en puerto 9999');
});
