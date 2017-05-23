var express = require('express');
var router = express.Router();
var User   = require('../models/user');
var passport = require('passport');

router.get('/new', function(req, res, next){
  res.render('sessions/new', {errors: [], user: {}});
});

router.post('/', passport.authenticate(
  'local', {
    successRedirect: '/projects',
    failureRedirect: '/sessions/new',
    successFlash: 'You\'re logged in',
    failureFlash: true
  })
);

router.get('/logout', function(req, res){
  req.flash('info', 'You\'re logged out');
  req.logout();
  res.redirect('/');
});

module.exports = router;
