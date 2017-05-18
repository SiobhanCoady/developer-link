'use strict';

module.exports = function(sequelize, DataTypes) {
  let ProjectMaterializedView = sequelize.define('ProjectMaterializedView', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    deadline: DataTypes.DATEONLY,
    github: DataTypes.STRING,
    document: DataTypes.TEXT
  }, {
      referenceModel: 'Project', // The model for which we're defining the materialized view
      search: true
  });
  return ProjectMaterializedView;
};
