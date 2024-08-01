const { DataTypes } = require('sequelize');
const connectDatabase = require('./services/ConnexionDB');

const sequelize = await connectDatabase();

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