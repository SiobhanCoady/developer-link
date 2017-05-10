'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectTaggings = sequelize.define('ProjectTaggings', {
    projectId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProjectTaggings;
};