'use strict';
const M = require('../models/index');
const User = M.User;
const faker = require('faker');

const users = Array
  .from({length: 10})
  .map(function() {
    return User.create({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: '12345678',
      website: faker.internet.domainName(),
      city: faker.address.city(),
      province: faker.address.stateAbbr(),
      country: faker.address.country(),
      description: faker.hacker.phrase(),
      user_type: 'developer'
    })
    .catch(function(error) { console.log('Duplicate user') });
  });


module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(users);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
