'use strict';
const M = require('../models/index');
const Message = M.Message;
const faker = require('faker');

const messages = Array
  .from({length: 40})
  .map(function() {
    return Message.create({
      senderId: Math.floor(Math.random() * 10) + 1,
      receiverId: Math.floor(Math.random() * 10) + 1,
      body: faker.hacker.phrase(),
      hasBeenSeen: false
    })
    .catch(function(error) { console.log('Error creating message') });
  });

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(messages);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
