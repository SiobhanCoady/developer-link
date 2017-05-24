var express = require('express');
var router = express.Router();
var User   = require('../models/user');
var passport = require('passport');

router.get('/new', function(req, res, next){
  res.render('sessions/new', {errors: [], user: {}});
});

// router.post('/', passport.authenticate(
//   'local', {
//     successRedirect: '/projects',
//     failureRedirect: '/sessions/new',
//     successFlash: 'You\'re logged in',
//     failureFlash: true
//   })
// );

// router.post('/',
//   passport.authenticate('local'),
//   function(req, res) {
//     if (req.user.userType === 'developer') {
//       req.flash('success', 'You\'re logged in');
//       res.redirect('/projects');
//     } else if (req.user.userType === 'nonprofit') {
//       req.flash('success', 'You\'re logged in');
//       res.redirect('/developers');
//     } else if (!req.user) {
//       req.flash('error', 'Error logging in');
//       res.redirect('/sessions/new');
//     } else {
//       req.flash('error', 'Error logging in');
//       res.redirect('/sessions/new');
//     }
//   }
// );

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/sessions/new'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      if (req.user.userType === 'developer') {
        req.flash('success', 'You\'re logged in');
        return res.redirect('/projects');
      } else if (req.user.userType === 'nonprofit') {
        req.flash('success', 'You\'re logged in');
        return res.redirect('/developers');
      }
    });
  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.flash('info', 'You\'re logged out');
  req.logout();
  res.redirect('/');
});

module.exports = router;
