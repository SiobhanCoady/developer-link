var express = require('express');
var router = express.Router();
const Project = require('../models/index').Project;
const User = require('../models/index').User;
const Tag = require('../models/index').Tag;
const ProjectTagging = require('../models/index').ProjectTagging;
const moment = require('moment');

router.get('/', function(req, res, next) {
  Project
    .findAll({
      where: {isHidden: false},
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

// Create project
router.post('/', function(req, res, next){
  let {
    title, description, deadline, github, technology, language, isHidden
  } = req.body;

  if (isHidden === undefined) {
    isHidden = false;
  }

  Project.create({
    title: title,
    description: description,
    deadline: deadline,
    github: github,
    ownerId: req.user.id,
    isHidden: isHidden
    })
    .then(function(project) {
      if (Array.isArray(technology)) {
        for (let tech of technology) {
          Tag.find({where: {name: tech}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
        }
      } else {
        Tag.find({where: {name: technology}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
      }

      if (Array.isArray(language)) {
        for (let lang of language) {
          Tag.find({where: {name: lang}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
        }
      } else {
        Tag.find({where: {name: language}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
      }

      res.redirect('/projects');
    })
    .catch(function(err) {
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
        res.render('projects/new', {errors: err, techs, langs});
      })
    })
});

// Edit project
router.get('/:id/edit', function(req, res) {
  const id = req.params.id;

  Project
    .findById(id)
    .then(function(project) {
      return Promise.all([
        project,
        moment(project.deadline).format('YYYY-MM-DD'),
        ProjectTagging.findAll({where: {projectId: project.id}, attributes: { exclude: ['ProjectId'] }}),
        Tag.findAll({
          where: { tagType: 'technology'}
        }),
        Tag.findAll({
          where: { tagType: 'language'}
        })
      ])
    })
    .then(function([project, deadline, projectTags, techs, langs]) {
      console.log("PROJECT DEADLINE", deadline);
      const tags = projectTags.map((tag) => tag.tagId);
      if (req.user && req.user.id === project.ownerId) {
        res.render('projects/edit', {project, deadline, techs, projectTags: tags, langs});
      } else {
        res.redirect('/');
      }
    });
});

// Update project
router.patch('/:id', function(req, res, next) {
  const id = req.params.id;
  let {
    title, description, deadline, github, technology, language, isHidden
  } = req.body;

  if (isHidden === undefined) {
    isHidden = false;
  }

  Project
    .findById(id)
    .then(function(project) {
      ProjectTagging.destroy({where: {projectId: project.id}});
      if (Array.isArray(technology)) {
        for (let tech of technology) {
          Tag.find({where: {name: tech}})
            .then(function(tag) {
              ProjectTagging.create({
                projectId: project.id,
                tagId: tag.id
              });
            })
        }
      } else {
        Tag.find({where: {name: technology}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
      }

      if (Array.isArray(language)) {
        for (let lang of language) {
          Tag.find({where: {name: lang}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
        }
      } else {
        Tag.find({where: {name: language}})
          .then(function(tag) {
            ProjectTagging.create({
              projectId: project.id,
              tagId: tag.id
            });
          })
      }

      return project.update({
        title: title,
        description: description,
        deadline: deadline,
        github: github,
        ownerId: req.user.id,
        isHidden: isHidden
      });
    })
    .then(function(project) {
      res.redirect(`/users/${project.ownerId}`);
    })
    .catch(function(err) { next(err) })
})

module.exports = router;
