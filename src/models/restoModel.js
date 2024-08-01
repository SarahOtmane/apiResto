const { DataTypes } = require('sequelize');
const connectDatabase = require('./services/ConnexionDB');

const sequelize = connectDatabase();

const Resto = sequelize.define('Resto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    nbSalles: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    salles: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
}, {
    tableName: 'restos',
    timestamps: true,
    underscored: true
});



module.exports = Resto;