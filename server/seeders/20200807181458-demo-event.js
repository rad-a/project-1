const Sequelize = require('sequelize')
const moment = require('moment')
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Events', [{
        
        date: "2020-08-07",
        title: "Meet Penny",
        details: "Penny is a murder dog",
        createdAt: new moment().format("YYYY-MM-DD"),
        updatedAt: new moment().format("YYYY-MM-DD")
      }], );
    
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('People', null, {});
  }
};