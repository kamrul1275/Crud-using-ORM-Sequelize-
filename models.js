const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Salary = sequelize.define('Salary', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// Establish relationships
Employee.hasMany(Salary, { foreignKey: 'employeeId' });
Salary.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = { Employee, Salary };