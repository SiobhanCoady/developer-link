'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    website: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.TEXT,
    userType: DataTypes.STRING,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    orgName: DataTypes.STRING,
    charityType: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Review, { as: 'reviewer', foreignKey: 'reviewerId' });
        User.hasMany(models.Review, { as: 'reviewed', foreignKey: 'reviewedId' });
        // User.hasMany(models.UserTagging, { as: 'tag', foreignKey: 'tagId' });
        User.belongsToMany(models.Tag, { as: 'user',
                                         through: models.UserTagging,
                                         foreignKey: 'userId'
                                       });
      }
    }
  });
  return User;
};
