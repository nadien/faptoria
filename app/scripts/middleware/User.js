var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken');

     module.exports = app;


 //modelado de api variables
 var User = mongoose.model( 'User' , {
   email : String ,
   nick : String ,
   pass : String ,
   role : { type:Number, default:3},
   images : Number
 });

//  module.exports = mongoose.model('Usuario' , User);

    //Authenticate
    app.post('/api/login',function(req,res){
    	User.findOne({
        email : req.body.email,
        pass : req.body.password
      }, function(err , user){
          if(err) res.send(err);

          if(!user){
            res.json("Falló la autenticación, usuario o contraseña incorrectos");
          }else {
            var token = jwt.sign(user, app.get('gjwtScrt'), {
             expiresInMinutes: 10080 // expires in 24 hours
           });

           // return the information including token as JSON
           res.json({
             success: true,
             token: token,
             userData : user
           });

          }
        });
    });


    //new user
    app.post('/api/signup' , function(req , res){
      User.findOne({
        email : req.body.email
      } , function(err , user, next){
        if(err) res.send(err)

        if(user == null){
            User.create({
              email : req.body.email,
              nick : req.body.nick,
              pass : req.body.password
            }, function(err , users){
                  if(err)
                  res.send(err);

                  res.json({
                    success : true,
                    message : "Registro exitoso."
                  });
            })
         } else if(user.email == req.body.email){
           res.send("Este email ya se ha usado antes");
         }
      });

    });


    var apiRoutess =  express.Router();

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


    //delete a user
    app.delete('/api/delete_user/:id', apiRoutess , function(req , res){
    
        User.remove({
         _id : req.params.id
        }, function(err , users){
          if(err)
            res.send(err);

          res.end("Usuario eliminado con éxito");
      })
    });

    //patch params on user
    app.put('/api/update_user/:id', apiRoutess , function(req , res){
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




    app.post('/api/users' , apiRoutess ,function(req , res){
        User.find().lean().exec( function(err , user){
          if(err)throw err;

        //  res.end(user);
          res.json(user);
      })
    });
    //get all users
