var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const Review = require('../models/index').Review;
const Tag = require('../models/index').Tag;
const UserTagging = require('../models/index').UserTagging;
const Project = require('../models/index').Project;
const reviews = require('./reviews');
const messages = require('./messages');
// const validate = require('form-validate');


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

  // req.Validator
  //   .validate('firstName', {
  //     required: true
  //   })
  //   .validate('lastName', {
  //     required: true
  //   })
  //   .validate('password', {
  //     length: {
  //       min: 4,
  //       max: 20
  //     }
  //   })
  //   .validate('email', {
  //     email: true
  //   })
  //
  //   req.Validator.getErrors(function(errors){
  //     res.render('users/new', {errors: errors});
  //   });

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
        // user.getCharity(),
        Project.findAll({
          where: { ownerId: user.id },
          order: [['createdAt', 'DESC']]
        })
      ])
    })
    .then(function([user, reviews, tags, projects]) {
      res.render('users/show', {user: user,
                                reviews: reviews,
                                tags: tags,
                                // charity: charity,
                                projects: projects
                               })
    })
});

// Edit user
router.get('/:id/edit', function(req, res) {
  const id = req.params.id;

  User
    .findById(id)
    .then(function(user) {
      return Promise.all([
        user,
        UserTagging.findAll({where: {userId: user.id}, attributes: { exclude: ['UserId'] }}),
        Tag.findAll({
          where: { tagType: 'technology'}
        }),
        Tag.findAll({
          where: { tagType: 'language'}
        }),
        Tag.findAll({
          where: { tagType: 'charityType'}
        })
      ])
    })
    .then(function([user, userTags, techs, langs, charities]) {
      const tags = userTags.map((tag) => tag.tagId);
      if (req.user && req.user.id === user.id) {
        res.render('users/edit', {user, techs, userTags: tags, langs, charities});
      } else {
        res.redirect('/');
      }
    });
});

// Update user
router.patch('/:id', function(req, res, next) {
  const id = req.params.id;
  const {firstName, lastName, email, userType, website, address, city,
    province, country, description, github, linkedin, orgName,
    charityType, technology, language, charity} = req.body;

  User
    .findById(id)
    .then(function(user) {
      UserTagging.destroy({where: {userId: user.id}});
      if (Array.isArray(technology)) {
        for (let tech of technology) {
          Tag.find({where: {name: tech}})
            .then(function(tag) {
              UserTagging.create({
                userId: user.id,
                tagId: tag.id
              });
            })
        }
      } else {
        Tag.find({where: {name: technology}})
          .then(function(tag) {
            UserTagging.create({
              userId: user.id,
              tagId: tag.id
            });
          })
      }

      if (Array.isArray(language)) {
        for (let lang of language) {
          Tag.find({where: {name: lang}})
          .then(function(tag) {
            UserTagging.create({
              userId: user.id,
              tagId: tag.id
            });
          })
        }
      } else {
        Tag.find({where: {name: language}})
          .then(function(tag) {
            UserTagging.create({
              userId: user.id,
              tagId: tag.id
            });
          })
      }

      if (Array.isArray(charity)) {
        for (let char of charity) {
          Tag.find({where: {name: char}})
          .then(function(tag) {
            UserTagging.create({
              userId: user.id,
              tagId: tag.id
            });
          })
        }
      } else {
        Tag.find({where: {name: charity}})
          .then(function(tag) {
            UserTagging.create({
              userId: user.id,
              tagId: tag.id
            });
          })
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
router.use('/:userId/messages', messages);

module.exports = router;
