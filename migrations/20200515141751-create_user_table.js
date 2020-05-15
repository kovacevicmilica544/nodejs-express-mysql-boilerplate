'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
          type: Sequelize.STRING(25),
          allowNull: false,
      },
      lastName: {
          type: Sequelize.STRING(25),
          allowNull: false,
      },
      email: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
      },
      password: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    },
  )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
