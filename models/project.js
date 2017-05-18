'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    deadline: DataTypes.DATEONLY,
    github: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    isHidden: DataTypes.BOOLEAN
  }, {
    customHooks: {
        afterSave: (models) => {
          models.ProjectMaterializedView.refresh();
        }
    },
    classMethods: {
      associate: function(models) {
        Project.belongsTo(models.User, { as: 'owner' });
        Project.belongsToMany(models.Tag, { as: 'Tags',
                                         through: 'ProjectTaggings',
                                         foreignKey: 'projectId',
                                         otherKey: 'tagId'
                                       });
      }
    }
  });
  return Project;
};
