const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('office', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres' for PostgreSQL
});

module.exports = sequelize;