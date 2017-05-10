var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const Review = require('../models/index').Review;
const UserTagging = require('../models/index').UserTagging;
const Project = require('../models/index').Project;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

module.exports = router;
