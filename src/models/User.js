const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const bcrypt = require('bcrypt');

/**
 * @swagger
 *  definitions:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - firstName
 *          - lastName
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *            format: password
 *            minimum: 4
 *          firstName:
 *            type: string 
 *          lastName:
 *            type: string
 */
const User = sequelize.define('users', {
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
    }
});

User.beforeCreate(function(user, options) {
    user.password = bcrypt.hashSync(user.password, 10);
})

User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
}

module.exports = User;