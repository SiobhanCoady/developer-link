'use strict';
const M = require('../models/index');
const Tag = M.Tag;

const tags = [
  { name: 'Animal', tagType: 'charityType' },
  { name: 'Environmental', tagType: 'charityType' },
  { name: 'International NGO', tagType: 'charityType' },
  { name: 'Health', tagType: 'charityType' },
  { name: 'Education', tagType: 'charityType' },
  { name: 'Arts and Culture', tagType: 'charityType' },
  { name: 'HTML', tagType: 'technology' },
  { name: 'CSS', tagType: 'technology' },
  { name: 'JavaScript', tagType: 'technology' },
  { name: 'Python', tagType: 'technology' },
  { name: 'Ruby', tagType: 'technology' },
  { name: 'PHP', tagType: 'technology' },
  { name: 'Go', tagType: 'technology' },
  { name: 'Objective-C', tagType: 'technology' },
  { name: 'Swift', tagType: 'technology' },
  { name: 'Java', tagType: 'technology' },
  { name: 'Meteor', tagType: 'technology' },
  { name: 'Node.js', tagType: 'technology' },
  { name: 'Ruby on Rails', tagType: 'technology' },
  { name: 'Django', tagType: 'technology' },
  { name: 'Ionic', tagType: 'technology' },
  { name: 'Bootstrap', tagType: 'technology' },
  { name: 'Wordpress', tagType: 'technology' },
  { name: 'Angular.js', tagType: 'technology' },
  { name: 'Ember.js', tagType: 'technology' },
  { name: 'jQuery', tagType: 'technology' },
  { name: 'React.js', tagType: 'technology' },
  { name: 'MongoDB', tagType: 'technology' },
  { name: 'Redis', tagType: 'technology' },
  { name: 'PostgreSQL', tagType: 'technology' },
  { name: 'English', tagType: 'language' },
  { name: 'French', tagType: 'language' },
  { name: 'Spanish', tagType: 'language' },
  { name: 'German', tagType: 'language' },
  { name: 'Mandarin', tagType: 'language' },
  { name: 'Hindi', tagType: 'language' },
  { name: 'Arabic', tagType: 'language' },
  { name: 'Russian', tagType: 'language' },
  { name: 'Bengali', tagType: 'language' },
  { name: 'Portuguese', tagType: 'language' }
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
