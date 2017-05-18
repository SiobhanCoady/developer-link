var express = require('express');
var router = express.Router();
const Project = require('../models/index').Project;
const User = require('../models/index').User;
const Tag = require('../models/index').Tag;
const ProjectTagging = require('../models/index').ProjectTagging;
const ProjectMaterializedView = require('../models/index').ProjectMaterializedView;
const moment = require('moment');
const _ = require('underscore');

async function getSearchResults(search, charity, searchAttributes) {
  const projects = await ProjectMaterializedView.searchByText(search);
  const tags = await Tag.findAll();

  const projectIds = projects.map(({id}) => id);
  let projectDetails = [];
  let arraysOfProjects = [];
  let projectIntersection = [];

  if (searchAttributes.length === 0 && charity.length === 0) {
    projectIntersection = await Project
      .findAll({
        where: {
          id: { $in: projectIds },
          isHidden: false
        },
        include: [
          {model: User, as: 'owner'},
          {model: Tag, as: 'Tags'}
        ]
      })
  } else if (searchAttributes.length === 0 && charity.length > 0) {
    projectIntersection = await Project
      .findAll({
        where: {
          id: { $in: projectIds },
          isHidden: false
        },
        include: [
          {
            model: User, as: 'owner',
            where: {charityType: charity}
          },
          {model: Tag, as: 'Tags'}
        ]
      })
  } else {
    let counter = 0;
    for (let attr of searchAttributes) {
      projectDetails[counter] = await Project
      .findAll({
        where: {
          id: { $in: projectIds },
          isHidden: false
        },
        include: [
          {
            model: Tag, as: 'Tags',
            where: {
              name: attr
            }
          }
        ]
      })
      .then(function(projects) {
        arraysOfProjects[counter] = projects.map(function(project) {return project.id});
      })
      counter++;
    }
    let filteredProjects = _.intersection.apply(_, arraysOfProjects);
    projectIntersection = await Project
    .findAll({
      where: {
        id: { $in: filteredProjects }
      },
      include: [
        {model: User, as: 'owner'},
        {model: Tag, as: 'Tags'}
      ]
    })
  }

  const tagsByType = {
    charityType: [],
    technology: [],
    language: []
  };

  tags.forEach((tag) => {
    tagsByType[tag.tagType].push(tag);
  });

  return [projectIntersection, tagsByType];
}


router.get('/', function(req, res, next) {
  if (req.query.search || req.query.charity || req.query.technology || req.query.language) {
    console.log(req.query);
    let charity = req.query.charity || [];
    let technologies = req.query.technology || [];
    let languages = req.query.language || [];

    const searchAttributes = _.flatten([
      technologies,
      languages
    ]);

    getSearchResults(req.query.search, charity, searchAttributes)
      .then(([filteredProjects, typedTags]) =>
        res.render('projects/index', {
          projects: filteredProjects,
          techs: typedTags.technology,
          langs: typedTags.language,
          chars: typedTags.charityType
        })
      );

  } else {
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
        return Promise.all([
          projects,
          Tag.findAll({
            where: { tagType: 'technology'}
          }),
          Tag.findAll({
            where: { tagType: 'language'}
          }),
          Tag.findAll({
            where: { tagType: 'charityType'}
          })
        ])
      })
      .then(function([projects, techs, langs, chars]) {
        res.render('projects/index', { projects, techs, langs, chars });
      });
  }
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
