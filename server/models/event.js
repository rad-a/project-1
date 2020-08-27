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
};