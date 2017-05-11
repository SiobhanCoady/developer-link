'use strict';
const M = require('../models/index');
const Project = M.Project;
const User = M.User;
const faker = require('faker');

const randomOwnerId = (possibleOwners) => {
  const randomlySelectedIndex = Math.floor(Math.random() * possibleOwners.length);
  const randomlySelectedOwner = possibleOwners[randomlySelectedIndex];
  return randomlySelectedOwner.id;
}

const createProjects = (possibleOwners) => {
    return Array
      .from({length: 20})
      .map(function() {
        return Project.create({
          title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
          description: faker.hacker.phrase(),
          deadline: faker.date.future(),
          github: faker.internet.url(),
          ownerId: randomOwnerId(possibleOwners)
        })
        .catch(function(error) { console.log('Duplicate project') });
      });
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    const possibleOwners = User.findAll(
                            { where: { userType: 'nonprofit' } }
                          ).then((users) => {
                            return Promise.all(createProjects(users));
                          });
    return possibleOwners;
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
