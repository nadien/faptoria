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


app.post('/api/sidebar' , function(req , res){

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

					res.json(article);
				});
			}else{
				res.json({ success : false , message : "Este título ya existe."});
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

app.post('/api/getArticles' , function(req , res){
	Sidebar.find().lean().exec( function(err , user){
          if(err)throw err;

        //  res.end(user);
          res.json(user);
      })
});