'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    
    static associate(models) {
      Event.belongsTo(models.User);
    }
  };
  Event.init({
    date: DataTypes.STRING,
    title: DataTypes.STRING,
    details: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
  //run a check to make sure our 
  //event is equal to our sequalize model (return true)
  console.log(Event === sequelize.models.Event);
};