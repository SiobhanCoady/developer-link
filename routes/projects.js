var express = require('express');
var router = express.Router();
const Project = require('../models/index').Project;
const User = require('../models/index').User;
const Tag = require('../models/index').Tag;

router.get('/', function(req, res, next) {
  Project
    .findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {model: User, as: 'owner', include: [
          {model: Tag, as: 'Tags', where: {tagType: 'charityType'}}
        ]},
        {model: Tag, as: 'Tags', where: {tagType: ['technology', 'language']}}
      ]
    })
    .then(function(projects) {
      res.render('projects/index', { projects: projects });
    });
});

module.exports = router;
