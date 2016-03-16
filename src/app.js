// client-side js cannot communicate to server-side directly

var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var dbURL = process.env.MONGOLAB_URI || "mongodb://heroku_52s8kmw8:afqmd8ob91p1e07lm47bkdku75@ds015929.mlab.com:15929/heroku_52s8kmw8";

var db = mongoose.connect(dbURL, function(err){
	if(err){
		console.log("Could not connect to database");
		throw err;
	}
});

var router = require('./router.js');
var port = process.env.PORT || process.env.NODE_PORT || 3000;
var app = express();
app.use('/assets/', express.static(path.resolve(__dirname + '../../client/')));
app.use(compression());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(favicon(__dirname + '/../client/img/favicon.png'));
app.use(cookieParser());
router(app);

app.listen(port, function(err){
	if(err){
		throw err;
	}
	console.log('Listening on port ' + port);
});

