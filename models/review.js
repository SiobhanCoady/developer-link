'use strict';
module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    reviewerId: DataTypes.INTEGER,
    reviewedId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Review.belongsTo(models.User, { as: 'reviewer' });
        Review.belongsTo(models.User, { as: 'reviewed' });
      }
    }
  });
  return Review;
};
