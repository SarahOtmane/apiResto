const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_Admin, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


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
    },
    id_resto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'tables',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Resto = require('./restoModel');
Table.belongsTo(Resto, { foreignKey: 'id_resto'});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Table.sync({ force: false });
        console.log("Modèle Table synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Table:", error);
    }
})();


module.exports = Table;