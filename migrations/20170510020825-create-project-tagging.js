'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ProjectTaggings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ProjectTaggings');
  }
};
