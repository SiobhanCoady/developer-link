'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectTagging = sequelize.define('ProjectTagging', {
    projectId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProjectTagging;
};
