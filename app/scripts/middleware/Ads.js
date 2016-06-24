'use strict';

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

var ads = mongoose.model( 'ads' ,{
	title : String , 
	content : String
}); 


var apiAds =  express.Router();

apiAds.use(function(req, res, next) {

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

app.post('/api/addAd',apiAds ,function(req, res){
    console.log(req.body);
    ads.findOne({
        title : req.body.title
    } , function(err , ad){
        if(err) res.send(err);
        
            if(ad == null ){
                ads.create({
                    title : req.body.title,
                    content : req.body.content
                }, function(err , Ad){
                    if(err) res.send(err);

                    res.json(Ad);
                });
            }else{
                ads.update({ title : req.body.title , content : req.body.content}, function(err , a){ if(err)throw err; res.json({succes : true , message : "Agregado con éxito" }) })
            }
        
    });
});


app.post('/api/getAds' , function(req , res){
    ads.find().lean().exec( function(err , user){
          if(err)throw err;

        //  res.end(user);
          res.json(user);
      })
});
