var express = require('express');
var kleiDust = require('klei-dust');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
kleiDust.setOptions({extension: 'template'});
app.set('views', path.join(__dirname, 'views'));
app.engine('template', kleiDust.dust);
app.set('view engine', 'template');
app.set('view options', {layout: false});

//Mongo
var mongodb = require("./mongo/mongo.js")(app); 

// Sockets
app.set("port", 3000);
var movieEvents = require('./sockets/MovieEvents.js')(app);


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// WS ROUTES
var ws_movies = require('./controllers/MovieController.js')(app);
var ws_actors = require('./controllers/ActorController.js')(app);

// RENDER ROUTES
var home = require('./routes/home');
var movies = require('./routes/movies');
var actors = require('./routes/actors');

// ROUTES
app.use('/', home);
app.use('/', movies);
app.use('/', actors);

//app.use('/', ws_movies);
//app.use('/', ws_actors);

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
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
