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

var Sidebar = mongoose.model( 'Sidebar' ,{
	title : String , 
	content : String
}); 


var apiSidebar =  express.Router();

apiSidebar.use(function(req, res, next) {

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


app.post('/api/sidebar' , apiSidebar, function(req , res){

	Sidebar.findOne({
		title : req.body.title
	} , function(err , articles){
		if(err) res.send(err);
		
			if(articles == null ){
				Sidebar.create({
					title : req.body.title,
					content : req.body.content
				}, function(err , article){
					if(err) res.send(err);

					res.json({ success : false , message : "Anuncio agregado correctamente."});
				});
			}else{
        Sidebar.update({title: req.body.title , content : req.body.content },function(err, sidead){if(err) throw err; res.json({ success : false , message : "Anuncio modificado correctamente."}) });
			}
		
	});
});

app.post('/api/getArticles' , function(req , res){
	Sidebar.find().lean().exec( function(err , user){
          if(err)throw err;

        //  res.end(user);
          res.json(user);
      })
});
