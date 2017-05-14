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

    let u = User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: '12345678',
      website: faker.internet.domainName(),
      city: faker.address.city(),
      province: faker.address.stateAbbr(),
      country: faker.address.country(),
      description: faker.hacker.phrase(),
      userType: determinedUserType,
      github: (determinedUserType === 'developer' ? faker.internet.url() : ''),
      linkedin: (determinedUserType === 'developer' ? faker.internet.url() : ''),
      orgName: (determinedUserType === 'nonprofit' ? faker.company.companyName() : ''),
      charityType: (determinedUserType === 'nonprofit' ? charities[Math.floor(Math.random() * charities.length)] : '')
    }).then(function(user) {
      // return geocoder.geocode(user.country, function ( err, data ) {
      //   user.updateAttributes({
      //     latitude: data.results[0].geometry.location.lat,
      //     longitude: data.results[0].geometry.location.lng
      //
      //   });
        return user;
      // })
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
