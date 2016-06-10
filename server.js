var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    Schema = mongoose.Schema,
    jwt = require('jsonwebtoken'),
    cors = require('cors'),
    http = require('http');
    config = require('./app/scripts/config');
    app.set('gjwtScrt', config.secret); // secret variable
var login = require('./app/scripts/middleware/User');
var getToken = require('./app/scripts/middleware/getRole');
var uploadImg = require('./app/scripts/middleware/Upload');
var sidebar = require('./app/scripts/middleware/Sidebar');
var phantom = require('node-phantom');
  var connect = require('connect'),
     crawlme = require('crawlme');
    //..localhost/[name] <-- indica la base de datos a usar en mongdb
    mongoose.connect('mongodb://localhost/faptoriaMujeres');

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(cors());
    app.use(express.static(__dirname + '/app'));
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));

    

    var appCrawl = connect().use(crawlme()).use(connect(__dirname + '/webroot'));

    http.createServer(appCrawl).listen(3000);

//Iniciando el servidor de imagenes con Multer
    app.get('/uploads/:id' , function(req , res){
        res.sendFile(__dirname+'/uploads/' + req.params.id);
    });

app.use(login);
app.use(getToken);
app.use(uploadImg);
app.use(sidebar);


 app.all('/*', function(req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.sendFile('/app/index.html', { root: __dirname });
});

app.use(function (request, response, next) {
 
    var pageUrl = request.query["_escaped_fragment_"];
 
    if (pageUrl !== undefined) {
 
        phantom.create(function (err, ph) {
 
        return ph.createPage(function (err, page) {
 
            var fullUrl = request.protocol + '://' + request.get('host') + pageUrl;
 
            return page.open(fullUrl, function (err, status) {
 
            page.get('content', function (err, html) {
 
                response.statusCode = 200;
 
                response.end(html);
 
                ph.exit();
 
            });
 
    });
 
});
 
});
 
} else {
 
    next();
 
}
 
});

// ************ All CRUDS methods will have only post *******************

app.listen(process.env.PORT || 9999 , function(port){
  console.log('Corriend en puerto 9999');
});
