'use strict';
const Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    
    static associate(models) {
        // Event should belong to user
      // An event can't be created without a user
      events.belongsTo(models.users, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  events.init({
    Date: { 
      type: Sequelize.DATEONLY,
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
    }
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};