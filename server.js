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



//modelado de api variables
var User = mongoose.model( 'User' , {
  email : String ,
  nick : String ,
  pass : String ,
  role : { type:Number, default:3}
});





app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error subiendo el archivo.");
		}
		res.end("File is uploaded");
	});
});



// ************ All CRUDS methods will have only post *******************


//get all users
app.post('/api/users' , function(req , res){
    User.find().lean().exec( function(err , user){
      if(err)throw err;

    //  res.end(user);
      res.json(user);
  })
});


//new user
app.post('/api/signup' , function(req , res){
    User.create({
     email : req.body.email,
     nick : req.body.nick,
     pass : req.body.password

    }, function(err , users){
        if(err)
          res.send(err);

      res.json(users);
  })
});

//delete a user
app.delete('/api/delete_user/:id' , function(req , res){
    User.remove({
     _id : req.params.id
    }, function(err , users){
      if(err)
        res.send(err);

      res.end("Usuario eliminado con éxito");
  })
});

//patch params on user
app.put('/api/update_user/:id' , function(req , res){
    User.findOneAndUpdate({
      _id : req.params.id
    },{$set : {
     email : req.body.email,
     nick : req.body.nick,
     password : req.body.password
    }
  }, function(err , users){
      if(err)
        res.send(err);

      res.end("Usuario actualizado con éxito");
  })
});

app.listen(process.env.PORT || 9999 , function(port){
  console.log('Corriend en puerto 9999');
});
