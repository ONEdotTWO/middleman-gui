
/*
var express = require('express');
var cons = require('consolidate');

var app = express();
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
	res.render('index', {});
});

app.get('*', function(req, res){
	res.send(404, 'Sorry the page does not exist');
});*/

var express = require('express');
var cons = require('consolidate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var messageParser = require('./messageParser');

var app = express();

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index', {});
});
app.get('/index.html', function(req, res){
	res.render('index', {});
});

/*
var messages;

messageParser.getMessages(function(messagesIn){
	console.log("App got " + messagesIn.length + " messages");
	messages = messagesIn;
});
*/
app.get('/messages.html', function(req, res){
	res.render('messages', {});
});

app.get('/rando.html', function(req, res){
	res.render('rando', {});
});

app.get('/getMessages.html', function(req, res){
	messageParser.getMessages(function(messagesIn){
		res.send(messagesIn);
	});
});

app.get('/getRando.html', function(req, res){
	messageParser.getRando(function(messagesIn) {
		res.send(messagesIn);
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log("Error: " + err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log("Error: " + err.message);
});


module.exports = app;
