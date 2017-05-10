'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTagging = sequelize.define('UserTagging', {
    userId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserTagging;
};
