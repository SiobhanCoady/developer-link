const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/index').User;
const Message = require('../models/index').Message;
const Response = require('../models/index').Response;
const responses = require('./responses');
var passport = require('passport');
const moment = require('moment');

// Messages#index
router.get('/', function(req, res) {
  const currentUserId = req.user.id
  Message
    .findAll({
      where: { receiverId: currentUserId },
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'receiver' },
        { model: User, as: 'sender' }
      ]
    })
    .then(function(rcvdMessages) {
      return Promise.all([
        rcvdMessages,
        Message
        .findAll({
          where: { senderId: currentUserId },
          order: [['createdAt', 'DESC']],
          include: [
            { model: User, as: 'receiver' },
            { model: User, as: 'sender' }
          ]
        })
      ])
    })
    .then(function([rcvdMessages, sentMessages]) {
      if (req.user) {
        res.render('messages/index', { rcvdMessages, sentMessages });
      } else {
        res.redirect('/');
      }
    })
});

// Messages#show
router.get('/:id', function(req, res) {
  const id = req.params.id;

  Message
    .find({
      where: { id: id },
      include: [
        { model: User, as: 'receiver' },
        { model: User, as: 'sender' }
      ]
    })
    .then(function(message) {
      return Promise.all([
        message,
        Response.findAll({
          where: { messageId: message.id },
          order: [['createdAt', 'ASC']],
          include: [
            { model: User, as: 'sender' }
          ]
        })
      ])
    })
    .then(function([message, responses]) {
      if (req.user) {
        res.render('messages/show', { message, responses });
      } else {
        res.redirect('/');
      }
    })
});


// Messages#create
router.post('/', function(req, res) {
  const userId = req.params.userId;

  Message
    .create({
      senderId: req.user.id,
      receiverId: userId,
      body: req.body.body,
      hasBeenSeen: false
    })
    .then(function() { res.redirect(`/users/${userId}`) })
});

router.use('/:messageId/responses', responses);

module.exports = router;
