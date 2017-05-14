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
        {model: User, as: 'owner'},
        {model: Tag, as: 'Tags'}
      ]
    })
    .then(function(projects) {
      res.render('projects/index', { projects: projects });
    });
});

router.get('/new', function(req, res, next){
  const project = Project.build();
  if (req.user && req.user.userType === 'nonprofit') {
    res.render('projects/new', {errors: [], project: project});
  } else {
    res.redirect('/projects');
  }
});

router.post('/', function(req, res, next){
  const {title, description, deadline, github} = req.body;
  Project.create({
    title: title,
    description: description,
    deadline: deadline,
    github: github
    })
    .then(function(project) {
      res.redirect('/projects');
    })
    .catch(function(err) {
      res.render('projects/new', {errors: err});
    })
});


module.exports = router;
