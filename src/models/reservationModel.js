const { DataTypes } = require('sequelize');
const connectDatabase = require('./services/ConnexionDB');

const sequelize = connectDatabase();


const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        
    },
    heure: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    nbPlace:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numTable:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'reservations',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Resto = require('./restoModel');
Resto.hasMany(Reservation, { foreignKey: 'id_resto'});
Reservation.belongsTo(Resto, { foreignKey: 'id_resto'});

const PlanTable = require('./planTableModel');
PlanTable.hasMany(Reservation, { foreignKey: 'id_planTable'});
Reservation.belongsTo(PlanTable, { foreignKey: 'id_plantable'});


module.exports = Reservation;