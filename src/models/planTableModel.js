const { DataTypes } = require('sequelize');
const connectDatabase = require('../services/ConnexionDB');

const sequelize = connectDatabase();

const PlanTable = sequelize.define('PlanTable', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    salle:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nbPlaces:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nbTables:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    full:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'planTables',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Resto = require('./restoModel');
Resto.hasMany(PlanTable, { foreignKey: 'id_resto'});
PlanTable.belongsTo(Resto, { foreignKey: 'id_resto'});


module.exports = PlanTable;