'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    
    static associate(models) {
        // Event should belong to user
      // An event can't be created without a user
      events.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  const events = sequelize.define("events", {
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