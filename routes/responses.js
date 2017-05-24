const express = require('express');
const router = express.Router({mergeParams: true});
const Message = require('../models/index').Message;
const Response = require('../models/index').Response;
var passport = require('passport');
const moment = require('moment');

// Responses#create
router.post('/', function(req, res) {
  const messageId = req.params.messageId;
  Response
    .create({
      messageId: messageId,
      senderId: req.user.id,
      body: req.body.body,
      hasBeenSeen: false
    })
    // .then(function() { res.redirect(`/users/${req.user.id}/messages/${messageId}`) })
    .then(function() { res.send(
      {
        sender: req.user,
        timestamp: moment().format('LLL')
      })
    })
})

module.exports = router;
