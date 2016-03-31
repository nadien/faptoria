var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    multer = require('multer'),
    Schema = mongoose.Schema,
    jwt = require('jsonwebtoken'),
    config = require('./app/scripts/config');
    app.set('gjwtScrt', config.secret); // secret variable
var login = require('./app/scripts/middleware/User');

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



/*
var apiRoutess = module.exports  = express.Router();

// route middleware to verify a token
apiRoutess.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp of token
    jwt.verify(token, app.get('gjwtScrt'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falló la autenticación de token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        if(decoded._doc.role == 3){
          res.send("Tu rol es visitante")
        }
        //res.send(decoded._doc.role)
        next();
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

app.use('/api', apiRoutess);

*/
app.use(login);



app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error subiendo el archivo.");
		}
		res.end("Archivo subido");
	});
});


// ************ All CRUDS methods will have only post *******************





app.listen(process.env.PORT || 9999 , function(port){
  console.log('Corriend en puerto 9999');
});
