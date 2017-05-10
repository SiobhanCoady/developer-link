'use strict';
const M = require('../models/index');
const ProjectTagging = M.ProjectTagging;

const projectTaggings = Array
  .from({length: 100})
  .map(function() {
    return ProjectTagging.create({
      userId: Math.floor(Math.random() * 10) + 1,
      tagId: Math.floor(Math.random() * 40) + 1
    })
    .catch(function(error) { console.log('Error creating project tag') });
  });

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(projectTaggings);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProjectTaggings', null, {});
  }
};
