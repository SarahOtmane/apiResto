const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


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
    id_resto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'infos',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Resto = require('./restoModel');
Info.belongsTo(Resto, { foreignKey: 'id_resto'});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Info.sync({ force: false });
        console.log("Modèle Info synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Info:", error);
    }
})();


module.exports = Info;