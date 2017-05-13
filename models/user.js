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
      validPassword: function(password) {
        return this.password === password;
      },
      // passportVerify: function(email, password, done) {
      //   return User
      //           .find({ where: { email: email } })
      //           .then(function(user) {
      //             if (err) { return done(err); }
      //             if (!user) {
      //               return done(null, false, { message: 'Incorrect email.' });
      //             }
      //             if (!user.validPassword(password)) {
      //               return done(null, false, { message: 'Incorrect password.' });
      //             }
      //             return done(null, user);
      //           });
      // },
      associate: function(models) {
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
