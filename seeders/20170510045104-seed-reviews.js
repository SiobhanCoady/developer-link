'use strict';
const M = require('../models/index');
const Review = M.Review;
const faker = require('faker');

const reviews = Array
  .from({length: 40})
  .map(async function() {
    let reviewerId = await Math.floor(Math.random() * 20) + 1;
    let reviewedId = await Math.floor(Math.random() * 20) + 1;
    if (reviewerId === reviewedId) {
      reviewedId++;
    }

    return await Review.create({
      reviewerId: reviewerId,
      reviewedId: reviewedId,
      body: faker.lorem.paragraph(),
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
