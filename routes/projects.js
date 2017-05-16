var express = require('express');
var router = express.Router();
const Project = require('../models/index').Project;
const User = require('../models/index').User;
const Tag = require('../models/index').Tag;
const ProjectTagging = require('../models/index').ProjectTagging;

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

  Tag.findAll({
    where: { tagType: 'technology'}
  })
    .then(function(techs) {
      return Promise.all([
        techs,
        Tag.findAll({
          where: { tagType: 'language'}
        })
      ])
    })
    .then(function([techs, langs]) {
      if (req.user && req.user.userType === 'nonprofit') {
        res.render('projects/new', {errors: [], project: project,
          techs: techs, langs: langs});
        } else {
          res.redirect('/projects');
        }
    })
});

router.post('/', function(req, res, next){
  const {title, description, deadline, github, technology, language} = req.body;
  Project.create({
    title: title,
    description: description,
    deadline: deadline,
    github: github
    })
    .then(function(project) {
      if (technology) {
        for (let tech of technology) {
          Tag.find({where: {name: tech}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
        }
      }

      if (language) {
        for (let lang of language) {
          Tag.find({where: {name: lang}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
        }
      }

      res.redirect('/projects');
    })
    .catch(function(err) {
      res.render('projects/new', {errors: err});
    })
});


module.exports = router;
