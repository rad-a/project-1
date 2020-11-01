'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    
    static associate(models) {
      Event.belongsTo(models.User);
    }
  };
  Event.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isAfter: DataTypes.NOW,  
        }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          len: [1,100]
        }
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true
    },

  }, {
    sequelize,
    modelName: 'Event',
  });
  //run a check to make sure our 
  //event is equal to our 
  //sequalize model (return true)
  console.log(Event === sequelize.models.Event);
  return Event
  
  
};