var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const Review = require('../models/index').Review;
const UserTagging = require('../models/index').UserTagging;
const Tag = require('../models/index').Tag;

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
        user.getTags()
      ])
    })
    .then(function([user, reviews, tags]) {
      res.render('users/show', {user: user, reviews: reviews, tags: tags})
    })
});

module.exports = router;
