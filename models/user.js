const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    userType: DataTypes.ENUM('developer', 'nonprofit'),
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    orgName: DataTypes.STRING,
    charityType: DataTypes.ENUM( 'Animal',
                          'Environmental',
                          'International NGO',
                          'Health',
                          'Education',
                          'Arts and Culture',
                          ''
                        )
  }, {
    customHooks: {
        afterSave: (models) => {
          models.UserMaterializedView.refresh();
        }
    },
    classMethods: {
      validPassword: async function(password, userPassword) {
        const result = await bcrypt.compare(password, userPassword);
        return result;
      },
      cryptPassword: async function(password) {
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        return hash;
      },
      associate: function(models) {
        User.hasMany(models.UserTagging, { as: 'user', foreignKey: 'userId' });
        User.belongsToMany(models.Tag, { as: 'Charities',
                                         scope: {
                                           tagType: 'charityType'
                                         },
                                         through: {
                                           model: 'UserTaggings'
                                          },
                                         foreignKey: 'userId',
                                         otherKey: 'tagId'
                                       });
        User.hasMany(models.Review, { as: 'reviewer', foreignKey: 'reviewerId' });
        User.hasMany(models.Review, { as: 'reviewed', foreignKey: 'reviewedId' });
        User.hasMany(models.Project, { as: 'owner', foreignKey: 'ownerId' });
        User.belongsTo(models.Tag, { as: 'charity', foreignKey: 'id' });
        User.belongsToMany(models.Tag, { as: 'Tags',
                                         through: 'UserTaggings',
                                         foreignKey: 'userId',
                                         otherKey: 'tagId'
                                       });
      }
    }
  });

  return User;
};
