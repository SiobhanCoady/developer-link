'use strict';
const M = require('../models/index');
const UserTagging = M.UserTagging;
const faker = require('faker');

const userTaggings = Array
  .from({length: 100})
  .map(function() {
    return UserTagging.create({
      userId: Math.floor(Math.random() * 10) + 1,
      tagId: Math.floor(Math.random() * 40) + 1
    })
    .catch(function(error) { console.log('Error creating user tag') });
  });

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(userTaggings);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserTaggings', null, {});
  }
};
