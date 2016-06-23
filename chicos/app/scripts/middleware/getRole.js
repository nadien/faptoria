var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken');

 module.exports = app;



var apiRoutes =  express.Router();

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

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
        //res.send(decoded);

        res.json({
          success : true ,
          userData : decoded
        })
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

app.use('/api/getRole', apiRoutes );
