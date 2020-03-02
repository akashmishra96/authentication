//var express = require('express');
//var path = require('path');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
//var passport = require('passport');
//var session = require('express-session');

//var index = require('./routes/index');
//var users = require('./routes/users');
//var auth = require('./routes/auth');

//var app = express();

//mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/node-passport-social', { useNewUrlParser: true ,useUnifiedTopology: true })
//  .then(() =>  console.log('connection successful'))
//  .catch((err) => console.error(err));
//
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({
//  secret: 's3cr3t',
//  resave: true,
//  saveUninitialized: true
//}));
//app.use(passport.initialize());
//app.use(passport.session());

//app.use('/', index);
//app.use('/users', users);
//app.use('/auth', auth);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

// error handler
//app.use(function(err, req, res, next) {
  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
//});


//module.exports = app;
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url,{useNewUrlParser:true}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'terces' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('port: ' + port);
