const { DataTypes } = require('sequelize');
const connectDatabase = require('./services/ConnexionDB');

const sequelize = await connectDatabase();

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