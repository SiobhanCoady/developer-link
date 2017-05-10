'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTagging = sequelize.define('UserTagging', {
    userId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        UserTagging.belongsTo(models.User, { foreignKey: 'userId' });
        UserTagging.belongsTo(models.Tag, { foreignKey: 'tagId' });
      }
    }
  });
  return UserTagging;
};
