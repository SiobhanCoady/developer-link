'use strict';
module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define('Response', {
    messageId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    hasBeenSeen: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Response.belongsTo(models.Message, { as: 'message' });
        Response.belongsTo(models.User, { as: 'sender' });
      }
    }
  });
  return Response;
};
