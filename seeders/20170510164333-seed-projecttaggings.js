'use strict';
const M = require('../models/index');
const ProjectTagging = M.ProjectTagging;

const projectTaggings = [
    { projectId: 1, tagId: 7 },
    { projectId: 1, tagId: 8 },
    { projectId: 1, tagId: 9 },
    { projectId: 1, tagId: 31 },
    { projectId: 2, tagId: 7 },
    { projectId: 2, tagId: 8 },
    { projectId: 2, tagId: 13 },
    { projectId: 2, tagId: 22 },
    { projectId: 2, tagId: 31 },
    { projectId: 3, tagId: 7 },
    { projectId: 3, tagId: 8 },
    { projectId: 3, tagId: 30 },
    { projectId: 3, tagId: 31 },
    { projectId: 3, tagId: 34 },
    { projectId: 4, tagId: 10 },
    { projectId: 4, tagId: 12 },
    { projectId: 4, tagId: 14 },
    { projectId: 4, tagId: 16 },
    { projectId: 4, tagId: 36 },
    { projectId: 5, tagId: 7 },
    { projectId: 5, tagId: 8 },
    { projectId: 5, tagId: 9 },
    { projectId: 5, tagId: 31 },
    { projectId: 5, tagId: 40 },
    { projectId: 6, tagId: 7 },
    { projectId: 6, tagId: 26 },
    { projectId: 6, tagId: 28 },
    { projectId: 6, tagId: 31 },
    { projectId: 6, tagId: 32 },
    { projectId: 6, tagId: 33 },
    { projectId: 7, tagId: 7 },
    { projectId: 7, tagId: 8 },
    { projectId: 7, tagId: 31 },
    { projectId: 7, tagId: 32 },
    { projectId: 7, tagId: 38 },
    { projectId: 8, tagId: 7 },
    { projectId: 8, tagId: 8 },
    { projectId: 8, tagId: 22 },
    { projectId: 8, tagId: 31 },
    { projectId: 8, tagId: 39 },
    { projectId: 9, tagId: 24 },
    { projectId: 9, tagId: 31 },
    { projectId: 10, tagId: 18 },
    { projectId: 10, tagId: 9 },
    { projectId: 10, tagId: 26 },
    { projectId: 10, tagId: 31 },
    { projectId: 11, tagId: 7 },
    { projectId: 11, tagId: 10 },
    { projectId: 11, tagId: 29 },
    { projectId: 11, tagId: 31 },
    { projectId: 11, tagId: 35 },
    { projectId: 12, tagId: 7 },
    { projectId: 12, tagId: 8 },
    { projectId: 12, tagId: 22 },
    { projectId: 12, tagId: 31 },
    { projectId: 13, tagId: 19 },
    { projectId: 13, tagId: 32 },
    { projectId: 14, tagId: 23 },
    { projectId: 14, tagId: 12 },
    { projectId: 14, tagId: 31 },
    { projectId: 15, tagId: 7 },
    { projectId: 15, tagId: 8 },
    { projectId: 15, tagId: 20 },
    { projectId: 15, tagId: 31 },
    { projectId: 16, tagId: 7 },
    { projectId: 16, tagId: 14 },
    { projectId: 16, tagId: 19 },
    { projectId: 16, tagId: 37 },
    { projectId: 17, tagId: 10 },
    { projectId: 17, tagId: 15 },
    { projectId: 17, tagId: 19 },
    { projectId: 17, tagId: 25 },
    { projectId: 17, tagId: 31 },
    { projectId: 18, tagId: 7 },
    { projectId: 18, tagId: 8 },
    { projectId: 18, tagId: 11 },
    { projectId: 18, tagId: 36 },
    { projectId: 19, tagId: 23 },
    { projectId: 19, tagId: 7 },
    { projectId: 19, tagId: 8 },
    { projectId: 19, tagId: 12 },
    { projectId: 19, tagId: 31 },
  ].map(function(tag) {
    ProjectTagging.create({
      projectId: tag.projectId,
      tagId: tag.tagId
    })
    .catch(function(error) { console.log('Error creating project tag') });
  })


// const projectTaggings = Array
//   .from({length: 100})
//   .map(function() {
//     return ProjectTagging.create({
//       projectId: Math.floor(Math.random() * 10) + 1,
//       tagId: Math.floor(Math.random() * 40) + 1
//     })
//     .catch(function(error) { console.log('Error creating project tag') });
//   });

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(projectTaggings);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProjectTaggings', null, {});
  }
};
