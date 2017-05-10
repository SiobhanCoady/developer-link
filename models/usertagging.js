'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTagging = sequelize.define('UserTagging', {
    userId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // UserTagging.belongsTo(models.User, { as: 'tag' });
        UserTagging.belongsTo(models.Tag, { as: 'tag' });
      }
    }
  });
  return UserTagging;
};
