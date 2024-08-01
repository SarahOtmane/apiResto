const { DataTypes } = require('sequelize');
const connectDatabase = require('./services/ConnexionDB');

const sequelize = await connectDatabase();

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
    },
    id_resto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'planTables',
    timestamps: true,
    underscored: true
});

// Définition des relations
const Resto = require('./restoModel');
PlanTable.belongsTo(Resto, { foreignKey: 'id_resto'});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await PlanTable.sync({ force: false });
        console.log("Modèle PlanTable synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle PlanTable:", error);
    }
})();


module.exports = PlanTable;