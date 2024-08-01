const { DataTypes } = require('sequelize');
const connectDatabase = require('../services/ConnexionDB');

const sequelize = connectDatabase();

const Info = sequelize.define('Info', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'infos',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Resto = require('./restoModel');
Resto.hasMany(Inof, { foreignKey: 'id_resto'});
Info.belongsTo(Resto, { foreignKey: 'id_resto'});


module.exports = Info;