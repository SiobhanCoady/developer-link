'use strict';
const M = require('../models/index');
const Review = M.Review;
const faker = require('faker');

const reviews = Array
  .from({length: 40})
  .map(function() {
    return Review.create({
      reviewerId: Math.floor(Math.random() * 10) + 1,
      reviewedId: Math.floor(Math.random() * 10) + 1,
      body: faker.hacker.phrase(),
      rating: Math.floor(Math.random() * 5) + 1
    })
    .catch(function(error) { console.log('Error creating review') });
  });

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(reviews);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
