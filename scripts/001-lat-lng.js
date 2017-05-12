'use strict';
const M = require('../models/index');
const User = M.User;
const geocoder = require('geocoder');

// geocoder.geocode(user.country, function ( err, data ) {
//   user.latitude = data.results[0].geometry.location.lat;
//   user.longitude = data.results[0].geometry.location.lng;
//   return user.save;

let u = User.findAll().then(function(users) {
  // return console.log(users);
  return users
}).map(function(user) {
  // return console.log(user.id);
  return geocoder.geocode(user.country, function ( err, data ) {
    // user.latitude = data.results[0].geometry.location.lat;
    // user.longitude = data.results[0].geometry.location.lng;
    // user.save;
    // return user;
    let location = data.results[0].geometry.location;
  }).then(function(location) {
    user.latitude = location.lat;
    user.longitude = location.lng;
    user.save;

  })
  console.log(user);
  return user;
})
