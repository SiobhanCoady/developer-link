'use strict';
const M = require('../models/index');
const UserTagging = M.UserTagging;
// const faker = require('faker');

const userTaggings = [
    { userId: 1, tagId: 2 },
    { userId: 1, tagId: 4 },
    { userId: 1, tagId: 6 },
    { userId: 1, tagId: 7 },
    { userId: 1, tagId: 8 },
    { userId: 1, tagId: 9 },
    { userId: 1, tagId: 14 },
    { userId: 1, tagId: 31 },
    { userId: 1, tagId: 34 },
    { userId: 2, tagId: 1 },
    { userId: 2, tagId: 2 },
    { userId: 2, tagId: 3 },
    { userId: 2, tagId: 7 },
    { userId: 2, tagId: 8 },
    { userId: 2, tagId: 12 },
    { userId: 2, tagId: 19 },
    { userId: 2, tagId: 31 },
    { userId: 2, tagId: 32 },
    { userId: 3, tagId: 4 },
    { userId: 3, tagId: 5 },
    { userId: 3, tagId: 6 },
    { userId: 3, tagId: 26 },
    { userId: 3, tagId: 29 },
    { userId: 3, tagId: 13 },
    { userId: 3, tagId: 31 },
    { userId: 4, tagId: 1 },
    { userId: 4, tagId: 3 },
    { userId: 4, tagId: 5 },
    { userId: 4, tagId: 11 },
    { userId: 4, tagId: 14 },
    { userId: 4, tagId: 7 },
    { userId: 4, tagId: 8 },
    { userId: 4, tagId: 8 },
    { userId: 4, tagId: 31 },
    { userId: 4, tagId: 35 },
    { userId: 5, tagId: 1 },
    { userId: 5, tagId: 2 },
    { userId: 5, tagId: 3 },
    { userId: 5, tagId: 4 },
    { userId: 5, tagId: 5 },
    { userId: 5, tagId: 6 },
    { userId: 5, tagId: 7 },
    { userId: 5, tagId: 8 },
    { userId: 5, tagId: 9 },
    { userId: 5, tagId: 18 },
    { userId: 5, tagId: 31 },
    { userId: 5, tagId: 34 },
    { userId: 6, tagId: 1 },
    { userId: 6, tagId: 10 },
    { userId: 6, tagId: 12 },
    { userId: 6, tagId: 14 },
    { userId: 6, tagId: 16 },
    { userId: 6, tagId: 31 },
    { userId: 6, tagId: 32 },
    { userId: 7, tagId: 2 },
    { userId: 7, tagId: 3 },
    { userId: 7, tagId: 7 },
    { userId: 7, tagId: 8 },
    { userId: 7, tagId: 9 },
    { userId: 7, tagId: 31 },
    { userId: 7, tagId: 36 },
    { userId: 8, tagId: 4 },
    { userId: 8, tagId: 5 },
    { userId: 8, tagId: 6 },
    { userId: 8, tagId: 7 },
    { userId: 8, tagId: 8 },
    { userId: 8, tagId: 9 },
    { userId: 8, tagId: 12 },
    { userId: 8, tagId: 12 },
    { userId: 8, tagId: 31 },
    { userId: 8, tagId: 40 },
    { userId: 9, tagId: 2 },
    { userId: 9, tagId: 3 },
    { userId: 9, tagId: 5 },
    { userId: 9, tagId: 7 },
    { userId: 9, tagId: 8 },
    { userId: 9, tagId: 9 },
    { userId: 10, tagId: 1 },
    { userId: 10, tagId: 6 },
    { userId: 10, tagId: 15 },
    { userId: 10, tagId: 19 },
    { userId: 10, tagId: 20 },
    { userId: 10, tagId: 22 },
    { userId: 10, tagId: 31 },
    { userId: 10, tagId: 32 },
    { userId: 10, tagId: 33 }
  ].map(function(tag) {
    UserTagging.create({
      userId: tag.userId,
      tagId: tag.tagId
    })
    .catch(function(error) { console.log('Error creating user tag') });
  })

// const userTaggings = Array
//   .from({length: 100})
//   .map(function() {
//     return UserTagging.create({
//       userId: Math.floor(Math.random() * 10) + 1,
//       tagId: Math.floor(Math.random() * 40) + 1
//     })
//     .catch(function(error) { console.log('Error creating user tag') });
//   });

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(userTaggings);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserTaggings', null, {});
  }
};
