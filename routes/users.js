var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const Review = require('../models/index').Review;
const Tag = require('../models/index').Tag;
const UserTagging = require('../models/index').UserTagging;
const Project = require('../models/index').Project;
const reviews = require('./reviews');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next){
  const user = User.build();
  res.render('users/new', {errors: [], user: user});
});

router.post('/', async function(req, res, next){
  const {firstName, lastName, email, userType} = req.body;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  if (password === passwordConfirmation) {
    User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await User.cryptPassword(password),
      userType: userType
    })
    .then(function(user) {
      req.login(user, function(err){
        if(err) {
          req.flash('error', 'Something went wrong');
          res.redirect('/sessions/new');
        } else {
          req.flash('info', 'Please complete your profile');
          res.redirect(`/users/${user.id}/edit`);
        }
      })
    })
    .catch(function(err) {
      res.render('users/new', {errors: err});
    })
  } else {
    req.flash('error', 'Password does not match password confirmation');
    res.redirect('/users/new');
  }
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
      return Promise.all([
        user,
        Tag.findAll({
          where: { tagType: 'technology'}
        }),
        Tag.findAll({
          where: { tagType: 'language'}
        })
      ])
    })
    .then(function([user, techs, langs]) {
      if (req.user && req.user.id === user.id) {
        res.render('users/edit', {user: user, techs: techs, langs: langs});
      } else {
        res.redirect('/');
      }
    });
});

router.patch('/:id', function(req, res, next) {
  const id = req.params.id;
  const {firstName, lastName, email, userType, website, address, city,
    province, country, description, github, linkedin, orgName,
    charityType, technology, language} = req.body;

  User
    .findById(id)
    .then(function(user) {
      if (technology) {
        for (let tech of technology) {
          Tag.find({where: {name: tech}})
          .then(function(tag) {
            UserTagging.create({
              userId: user.id,
              tagId: tag.id
            });
          })
        }
      }

      if (language) {
        for (let lang of language) {
          Tag.find({where: {name: lang}})
          .then(function(tag) {
            UserTagging.create({
              userId: user.id,
              tagId: tag.id
            });
          })
        }
      }

      return user.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userType: userType,
        website: website,
        address: address,
        city: city,
        province: province,
        country: country,
        description: description,
        github: github,
        linkedin: linkedin,
        orgName: orgName,
        charityType: charityType
      });
    })
    .then(function(user) {
      res.redirect(`/users/${id}`);
    })
    .catch(function(err) { next(err) })
})

router.use('/:userId/reviews', reviews);

module.exports = router;
