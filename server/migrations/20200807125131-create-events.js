'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
          type: Sequelize.DATE,
          validate: {
              isDate: true,
              isAfter: sequelize.NOW,
              allowNull: false
          }
      },
      title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1,100]
      }
      },
      details: {
        type: Sequelize.STRING,
        allowNull: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};