var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('projects/index', { title: 'Web Dev Link' });
});

module.exports = router;
