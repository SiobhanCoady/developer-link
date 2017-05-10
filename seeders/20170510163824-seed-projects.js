'use strict';
const M = require('../models/index');
const Project = M.Project;
const faker = require('faker');

const projects = Array
  .from({length: 20})
  .map(function() {
    return Project.create({
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      description: faker.hacker.phrase(),
      deadline: faker.date.future(),
      github: faker.internet.url(),
      ownerId: Math.floor(Math.random() * 10) + 1
    })
    .catch(function(error) { console.log('Duplicate project') });
  });


module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(projects);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
