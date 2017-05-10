'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    deadline: DataTypes.DATEONLY,
    github: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Project.belongsTo(models.User, { as: 'owner' });
      }
    }
  });
  return Project;
};
