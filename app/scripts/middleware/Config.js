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

var configs = mongoose.model( 'configs' ,{
	identifier : String,
	topbarBool : { type : Boolean , default : false},
	topbarText : String, 
	donate : { type : Boolean , default : false}
}); 


var permissionConfig =  express.Router();

permissionConfig.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, app.get('gjwtScrt'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falló la autenticación de token.' });
      } else {
        req.decoded = decoded;
        if(decoded._doc.role === 1 ){
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


app.post('/api/config' , function(req, res){

  configs.findOne({identifier : "settings"} , function(err , config , next){
  	if(err) throw err;

  	if(config == null){
  		configs.create({
		  identifier : "settings",
		  topbarBool :  req.body.bool,
		  topbarText : "",
	   	donate : true
	 	 });
  	}else{
  		switch(req.body.conf){
    		case 'topbarBool' : configs.update({ topbarBool : req.body.bool},function(err, result){ if(err)throw err; res.json({succes : true , message : "Estado: "+req.body.bool })}); break;
    		case 'topbarText' : configs.update({ topbarText : req.body.topText},function(err, result){ if(err)throw err; res.json(result)}); break;
    		case 'donate' : configs.update({ donate : req.body.donate},function(err, result){ if(err)throw err; res.json({succes:true,message:"Estado: " + req.body.donate})}); break;
    		default : res.json({ success : false , message : "Tus argumentos no son  correctos"}); break;
	  	}
  	}
  });



});
	
	
app.post('/api/configRes', function(req , res){
	configs.find().lean().exec( function(err , response){
          if(err)throw err;

        //  res.end(user);
          res.json(response);
      });
	
	console.log(req.body);
});



