'use strict';
const M = require('../models/index');
const Message = M.Message;
const faker = require('faker');

const messages = Array
  .from({length: 40})
  .map(async function() {
    let senderId = await Math.floor(Math.random() * 20) + 1;
    let receiverId = await Math.floor(Math.random() * 20) + 1;
    if (senderId === receiverId) {
      receiverId++;
    }

    return await Message.create({
      senderId: senderId,
      receiverId: receiverId,
      body: faker.lorem.paragraph(),
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
