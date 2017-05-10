'use strict';
const M = require('../models/index');
const Tag = M.Tag;

const tags = [
  { name: 'Animal', tagType: 'charityType' },
  { name: 'Environmental', tagType: 'charityType' },
  { name: 'International NGO', tagType: 'charityType' },
  { name: 'Health', tagType: 'charityType' },
  { name: 'Education', tagType: 'charityType' },
  { name: 'Arts and Culture', tagType: 'charityType' }
].map(function(tag) {
    return Tag.create({
      name: tag.name,
      tagType: tag.tagType
    })
    .catch(function(error) { console.log('Error creating tag') });
  });


module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(tags);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
