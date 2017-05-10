'use strict';
const M = require('../models/index');
const Tags = M.Tags;
const faker = require('faker');

const users = Array
  .from({length: 10})
  .map(function() {
    let num = Math.floor(Math.random() * 2)
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
      user_type: num > 1 ? 'developer' : 'nonprofit',
      github: faker.internet.url(),
      linkedin: faker.internet.url(),
      org_name: faker.company.companyName(),
      charity_type: DataTypes.INTEGER
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
