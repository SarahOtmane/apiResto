const { DataTypes } = require('sequelize');
const connectDatabase = require('./services/ConnexionDB');

const sequelize = connectDatabase();


const Table = sequelize.define('Table', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nbPlace:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numero:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    taken:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'tables',
    timestamps: true,
    underscored: true
});

// Définition des relations
const PlanTable = require('./planTableModel');
PlanTable.hasMany(Table, { foreignKey: 'id_plantable'});
Table.belongsTo(PlanTable, { foreignKey: 'id_plantable'});


module.exports = Table;