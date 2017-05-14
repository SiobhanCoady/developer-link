const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/index').User;
const Review = require('../models/index').Review;
var passport = require('passport');

// Reviews#create
router.post('/', function(req, res) {
  const userId = req.params.userId;

  Review
    .create({
      reviewerId: req.user.id,
      reviewedId: userId,
      body: req.body.body,
      rating: req.body.rating
    })
    .then(function() { res.redirect(`/users/${userId}`) })
})

module.exports = router;
