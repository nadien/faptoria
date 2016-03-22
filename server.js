var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//..localhost/[name] <-- indica la base de datos a usar en mongdb
mongoose.connect('mongodb://localhost/faptoria');

app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var articulos = mongoose.model('articulos' , {
  nombre : String
});


app.get('/api/get' , function(req, res){
  Todo.find(function(err, todos) {

           // if there is an error retrieving, send the error. nothing after res.send(err) will execute
           if (err)
               res.send(err)

           res.json(todos); // return all todos in JSON format
       });
   });

   // create todo and send back all todos after creation
   app.post('/api/post', function(req, res) {

       // create a todo, information comes from AJAX request from Angular
       Todo.create({
           nombre : req.body.text,
           done : false
       }, function(err, todo) {
           if (err)
               res.send(err);

           // get and return all the todos after you create another
           Todo.find(function(err, todos) {
               if (err)
                   res.send(err)
               res.json(todos);
           });
       });

   });


app.listen(process.env.PORT || 9999 , function(port){
  console.log('Corriend en puerto 9999');
});
