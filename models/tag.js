'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    tagType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.hasMany(models.UserTagging);
        Tag.belongsToMany(models.User, { as: 'TaggedUser',
                                         through: models.UserTagging,
                                         foreignKey: 'tagId'
                                       });
      }
    }
  });
  return Tag;
};
