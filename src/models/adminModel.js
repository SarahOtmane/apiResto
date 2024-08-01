const { DataTypes } = require('sequelize');
const connectDatabase = require('./services/ConnexionDB');

const sequelize = connectDatabase();

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'admins',
    timestamps: true,
    underscored: true
});

module.exports = Admin;