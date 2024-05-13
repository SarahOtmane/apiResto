const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_Admin, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


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
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    id_resto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_planTables: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'reservations',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Resto = require('./restoModel');
Reservation.belongsTo(Resto, { foreignKey: 'id_resto'});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Reservation.sync({ force: false });
        console.log("Modèle Reservation synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Reservation:", error);
    }
})();


module.exports = Reservation;