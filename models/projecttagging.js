'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectTagging = sequelize.define('ProjectTagging', {
    projectId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        ProjectTagging.belongsTo(models.Project, { foreignKey: 'projectId' });
        ProjectTagging.belongsTo(models.Tag, { foreignKey: 'tagId' });
      }
    }
  });
  return ProjectTagging;
};
