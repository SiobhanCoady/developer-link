var express = require('express');
var router = express.Router();
const User = require('../models/index').User;

router.get('/', function(req, res, next) {
  User
    .findAll({
      where: {userType: 'developer'},
      order: [['createdAt', 'DESC']]})
    .then(function(developers) {
      res.render('developers/index', { developers: developers });
    });
  // res.render('developers/index', { title: 'Web Dev Link' });
});

module.exports = router;
