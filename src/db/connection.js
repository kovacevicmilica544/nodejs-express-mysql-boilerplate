const Sequelize = require('sequelize');
const {MYSQL_USER, MYSQL_PW} = require('../enviroment/enviroment');

const sequelize = new Sequelize('boilerplate', MYSQL_USER, MYSQL_PW, {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = sequelize;