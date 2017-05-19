'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    hasBeenSeen: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.User, { as: 'sender' });
        Message.belongsTo(models.User, { as: 'receiver' });
        Message.hasMany(models.Response, { as: 'message', foreignKey: 'messageId' });
      }
    }
  });
  return Message;
};
