'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // Event should belong to user
      // An event can't be created without a user
      Event.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Events.init({
    date: DataTypes.STRING,
    title: DataTypes.STRING,
    details: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};