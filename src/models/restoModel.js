const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


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

const Info = require('./infoModel');
Resto.hasMany(Info, { foreignKey: 'id_resto' });

const PlanTable = require('./planTableModel');
Resto.hasMany(PlanTable, { foreignKey: 'id_resto' });

const Reservation = require('./reservationModel');
Resto.hasMany(Reservation, { foreignKey: 'id_resto' });

// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Resto.sync({ force: false });
        console.log("Modèle Resto synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Resto:", error);
    }
})();


module.exports = Resto;