'use strict';

module.exports = function(sequelize, DataTypes) {
  let UserMaterializedView = sequelize.define('UserMaterializedView', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    description: DataTypes.TEXT,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    document: DataTypes.TEXT
  }, {
      referenceModel: 'User', // The model for which we're defining the materialized view
      search: true
  });
  return UserMaterializedView;
};
