var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.connect('mongodb://localhost/nizduck');

var feed = require('./routes/feed');
var board = require('./routes/board');
var calendar = require('./routes/calendar');
var user = require('./routes/user');

var app = express();

app.set('jwt-secret', 'temp');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        url: 'mongodb://localhost/nizduck',
        autoRemove: 'native',
        stringify: false
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    var allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://www.nizduck.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,x-access-token');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})

// app.use('/feed', feed);
// app.use('/board', board);
// app.use('/calendar', calendar);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.redirect('/');
    next(err);
});
  
// error handlers
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        succuess: false,
        message: err.message,
        error: err
    });
});

app.listen(3000);

module.exports = app;