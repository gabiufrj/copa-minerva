var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var db = require('./config/db');

var port = process.env.PORT || 7000;

mongoose.connect(db.url);

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
var rotas = require('./app/rotas');
app.use('/api', rotas);

// start app ===============================================
app.listen(port);

console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;