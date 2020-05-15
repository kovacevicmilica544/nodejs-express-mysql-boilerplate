require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PW: process.env.MYSQL_PW
};