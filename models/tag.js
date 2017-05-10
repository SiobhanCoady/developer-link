'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    tagType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.hasMany(models.UserTagging, { as: 'tag', foreignKey: 'tagId' });
        Tag.belongsToMany(models.User, { as: 'tag',
                                         through: models.UserTagging,
                                         foreignKey: 'tagId'
                                       });
      }
    }
  });
  return Tag;
};
