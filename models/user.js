// var bcrypt = require('bcrypt-nodejs');
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
    // instanceMethods: {
    //     generateHash: function(password) {
    //         return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    //     },
    //     validPassword: function(password) {
    //         return bcrypt.compareSync(password, this.password);
    //     },
    // },
    customHooks: {
        afterSave: (models) => {
          models.UserMaterializedView.refresh();
        }
    },
    classMethods: {
      validPassword: function(password) {
        return this.password === password;
      },
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

  // var hashPasswordHook = function(instance, done) {
  //   if (!instance.changed('password')) return done();
  //   bcrypt.hash(instance.get('password'), 10, function (err, hash) {
  //     if (err) return done(err);
  //     instance.set('password', hash);
  //     done();
  //   });
  // };
  // User.beforeCreate(hashPasswordHook);
  // User.beforeUpdate(hashPasswordHook);

  return User;
};
