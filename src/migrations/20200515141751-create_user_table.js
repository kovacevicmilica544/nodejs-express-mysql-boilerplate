'use strict';

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
          type: Sequelize.STRING,
          allowNull: false,
          len: [7, 100],
          unique: true,
          isEmail: true
      },
      password: {
          type: Sequelize.TEXT,
          allowNull: false,
          min: 4
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    },
  )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
