const {User} = require('../models/');

const createUser = async (data) => {
    return await User.create({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
    });
}

const getUserById = async (id) => {
    return await User.findById(id).select('-hash');
}

const getUserByEmail = async(email) => {
    return await User.findOne({
        where: {
            email: email
        }
    });
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
}