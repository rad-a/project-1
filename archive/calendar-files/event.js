const moment= require("moment");
const { isNull } = require("util");
let currentTime = moment()
const dateFormat = 'YY-MM-dd';
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Event = sequelize.define("Event", {
      eventDate: { 
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
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1]
      }/*,
      createdAt: { 
          type: Sequelize.DATEONLY, 
          allowNull:true,
          defaultValue: true
        },
      
      updatedAt: {
        type: Sequelize.DATEONLY, 
        defaultValue: Sequelize.NOW 
      },*/
      
    });
  
    Event.associate = function(models) {
      // Event should belong to user
      // An event can't be created without a user
      Event.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Event;
  };
  