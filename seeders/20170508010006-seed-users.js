'use strict';
const M = require('../models/index');
const User = M.User;
const faker = require('faker');

const users = Array
  .from({length: 10})
  .map(function() {
    let num = Math.floor(Math.random() * 10) + 1
    let charities = [ 'Animal',
                      'Environmental',
                      'International NGO',
                      'Health',
                      'Education',
                      'Arts and Culture'
                    ]
    return User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: '12345678',
      website: faker.internet.domainName(),
      city: faker.address.city(),
      province: faker.address.stateAbbr(),
      country: faker.address.country(),
      description: faker.hacker.phrase(),
      userType: num > 5 ? 'developer' : 'nonprofit',
      github: faker.internet.url(),
      linkedin: faker.internet.url(),
      orgName: faker.company.companyName(),
      charityType: charities[Math.floor(Math.random() * charities.length)]
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
