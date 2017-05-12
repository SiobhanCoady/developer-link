var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const UserMaterializedView = require('../models/index').UserMaterializedView;

router.get('/', function(req, res, next) {
  if (req.query.search) {
    UserMaterializedView
      .searchByText(req.query.search)
      .then(function(developers) {
        res.render('developers/index', { developers: developers });
      });
  } else {
    User
      .findAll({
        where: {userType: 'developer'},
        order: [['createdAt', 'DESC']]})
      .then(function(developers) {
        res.render('developers/index', { developers: developers });
      });
  }
});

module.exports = router;
