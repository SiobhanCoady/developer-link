var expressSession = require('express-session');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var Sequelize = require('sequelize'),
	passportLocalSequelize = require('passport-local-sequelize');
const bcrypt = require('bcrypt');
const moment = require('moment');
var request = require('request');
var rp = require('request-promise');
// const validate = require('form-validate');

var mydb = new Sequelize('fp_dev', 'myuser', 'mypass', {
	dialect: 'postgres',
	storage: 'fp_dev.postgres'
});


var index = require('./routes/index');
var users = require('./routes/users');
var developers = require('./routes/developers');
var projects = require('./routes/projects');
var sessions = require('./routes/sessions');
var reviews = require('./routes/reviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(expressSession({secret: 'siobhansecret',
                        resave: false,
                        saveUninitialized: false,
                        cookie: { maxAge: 6000000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
app.use(cookieParser());

// // Configure form-validate
// var validationConfig = {
//     //You can configure certain aspects of the validation module
// };
// app.use(validate(app, validationConfig));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success   = req.flash('success').join(', ');
  res.locals.error     = req.flash('error').join(', ');
  res.locals.info      = req.flash('info').join(', ');
  next();
});

app.use(function(req, res, next) {
  res.locals.currentUser = req.user || null;
  next();
});

// passport setup
const User = require('./models/index').User;

// Use local strategy to create user account
passport.use(new LocalStrategy({usernameField: 'email'},
  async function(email, password, done) {
    User.find({ where: { email: email }}).then(async function(user) {
			if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (!(await User.validPassword(password, user.password))) {
			  done(null, false, { message: 'Invalid password'});
      } else {
        done(null, user);
      }
    }).catch(function(err){
      done(err);
    });
  }
));

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.find({where: {id: id}}).then(function(user){
    done(null, user);
  }).catch(function(err){
    done(err, null);
  });
});

// app.get('/flash', function(req, res){
// 	// Set a flash message by passing the key, followed by the value, to req.flash().
// 	req.flash('info', 'Flash is back!')
// 	res.redirect('/');
// });
//
// app.get('/', function(req, res){
// 	// Get an array of flash messages by passing the key to req.flash()
// 	res.render('index', { messages: req.flash('info') });
// });

app.use('/', index);
app.use('/users', users);
app.use('/developers', developers);
app.use('/projects', projects);
app.use('/sessions', sessions);
app.use('/users/:userId/reviews', reviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
