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
var settings = require('./app/scripts/middleware/Config');
var ads = require('./app/scripts/middleware/Ads');
var htmlSnapshots = require("html-snapshots");
var easyimg = require('easyimage');
var phantom = require('node-phantom');
var htmlSnapshots = require('html-snapshots');
const cache = require('cache-cache');

    mongoose.connect('mongodb://localhost/faptoriaMujeres');

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(cors());
    app.use(express.static(__dirname + '/app'));
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));
    app.use(require('prerender-node'));

 /*
    htmlSnapshots.run({
      input: "sitemap",
      source: "http://localhost:9999/sitemap.xml",
      outputDir: (__dirname + "./tmp"),
      outputDirClean: true,
      selector: "#dynamic-content",
      snapshotScript: {
        script: "customFilter",
        module: (__dirname + "/myFilter.js")
      },
      timeout: 15000
    }, function(err, completed) {  

      console.log("completed snapshots:");
      //console.log(util.inspect(completed));

      // throw if there was an error
      //assert.ifError(err);
    });
*/
//Iniciando el servidor de imagenes con Multer
    app.get('/uploads/:id' , function(req , res){
        res.sendFile(__dirname+'/uploads/' + req.params.id);
    });
//cache
app.use(cache());
app.use('/', cache());
//cache

app.use(login);
app.use(getToken);
app.use(uploadImg);
app.use(sidebar);
app.use(settings);
app.use(ads);


 app.all('/*', function(req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.sendFile('/app/index.html', { root: __dirname });
});



// ************ All CRUDS methods will have only post *******************

app.listen(process.env.PORT || 9999 , function(port){
  console.log('Corriend en puerto 9999');
});
