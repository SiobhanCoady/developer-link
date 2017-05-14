var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const Review = require('../models/index').Review;
const UserTagging = require('../models/index').UserTagging;
const Project = require('../models/index').Project;
const reviews = require('./reviews');

// function cryptPassword(password, callback) {
//   bcrypt.genSalt(10, function(err, salt) { // Encrypt password using bycrpt module
//     if (err) {
//       return callback(err);
//     }
//     bcrypt.hash(password, salt, function(err, hash) {
//       return callback(err, hash);
//     });
//   });
// }



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next){
  const user = User.build();
  res.render('users/new', {errors: [], user: user});
});

router.post('/', function(req, res, next){
  const {firstName, lastName, email, userType} = req.body;
  const password = req.body.password;

  // User.beforeCreate(function(model, options, cb) {
  //   // debug('Info: ' + 'Storing the password');
  //   cryptPassword(password, function(err, hash) {
  //     if (err) return cb(err);
  //     // debug('Info: ' + 'getting ' + hash);
  //
  //     password = hash;
  //     return cb(null, options);
  //   });
  // });

  User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    userType: userType
    })
    .then(function(user) {
      req.login(user, function(err){
        if(err) {
          req.flash('error', 'Something went wrong');
          res.redirect('/sessions/new');
        } else {
          req.flash('info', 'You\'re logged in');
          res.redirect(`/users/${user.id}/edit`);
        }
      })
    })
    .catch(function(err) {
      res.render('users/new', {errors: err});
    })
});

// Show user
router.get('/:id', function(req, res) {
  const id = req.params.id;

  User
    .findById(id)
    .then(function(user) {
      return Promise.all([
        user,
        Review.findAll({
          where: { reviewedId: user.id },
          include: [
            { model: User, as: 'reviewer' }
          ]
        }),
        user.getTags(),
        user.getCharity(),
        Project.findAll({
          where: { ownerId: user.id },
          order: [['createdAt', 'DESC']]
        })
      ])
    })
    .then(function([user, reviews, tags, charity, projects]) {
      res.render('users/show', {user: user,
                                reviews: reviews,
                                tags: tags,
                                charity: charity,
                                projects: projects
                               })
    })
});

router.get('/:id/edit', function(req, res) {
  const id = req.params.id;

  User
    .findById(id)
    .then(function(user) {
      if (req.user && req.user.id === user.id) {
        res.render('users/edit', {user: user});
      } else {
        res.redirect('/');
      }
    });
});

router.patch('/:id', function(req, res, next) {
  const id = req.params.id;
  const {firstName, lastName, email, userType} = req.body;

  User
    .findById(id)
    .then(function(user) {
      return user.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userType: userType
      });
    })
    .then(function(user) {
      res.redirect(`/users/${id}`);
    })
    .catch(function(err) { next(err) })
})

router.use('/:userId/reviews', reviews);

module.exports = router;
