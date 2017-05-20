'use strict';
const M = require('../models/index');
const User = M.User;
const faker = require('faker');
const geocoder = require('geocoder');

let charities = [ 'Animal',
                  'Environmental',
                  'International NGO',
                  'Health',
                  'Education',
                  'Arts and Culture'
                ]

const users = Array
  .from({length: 10})
  .map(function() {
    let num = Math.floor(Math.random() * 10) + 1
    const determinedUserType = num > 5 ? 'developer' : 'nonprofit'
    let lat = Math.floor(Math.random() * 120) - 60;
    let lng = Math.floor(Math.random() * 360) - 180;

    let u = User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: '12345678',
      website: faker.internet.domainName(),
      address: '',
      city: faker.address.city(),
      province: faker.address.stateAbbr(),
      country: faker.address.country(),
      latitude: lat,
      longitude: lng,
      description: faker.hacker.phrase(),
      userType: determinedUserType,
      github: (determinedUserType === 'developer' ? faker.internet.url() : ''),
      linkedin: (determinedUserType === 'developer' ? faker.internet.url() : ''),
      orgName: (determinedUserType === 'nonprofit' ? faker.company.companyName() : ''),
      charityType: (determinedUserType === 'nonprofit' ? charities[Math.floor(Math.random() * charities.length)] : ''),
      avatar: 'avatarneutral2.png'
    })
    return u;
  });


module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(users);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
