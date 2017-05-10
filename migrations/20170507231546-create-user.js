'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      userType: {
        type: Sequelize.ENUM('developer', 'nonprofit')
      },
      github: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      orgName: {
        type: Sequelize.STRING
      },
      charityType: {
        type: Sequelize.ENUM( 'Animal',
                              'Environmental',
                              'International NGO',
                              'Health',
                              'Education',
                              'Arts and Culture'
                            )
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
    return queryInterface.dropTable('Users');
  }
};
