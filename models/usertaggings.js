'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTaggings = sequelize.define('UserTaggings', {
    userId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserTaggings;
};