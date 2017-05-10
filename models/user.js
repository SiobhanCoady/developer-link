'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    website: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_type: DataTypes.STRING,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    org_name: DataTypes.STRING,
    charity_type: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Review, { as: 'reviewer', foreignKey: 'reviewerId' });
        User.hasMany(models.Review, { as: 'reviewed', foreignKey: 'reviewedId' });
      }
    }
  });
  return User;
};
