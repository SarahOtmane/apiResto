const { DataTypes } = require('sequelize');
const connectDatabase = require('./services/ConnexionDB');

const sequelize = await connectDatabase();


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
    id_planTable: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'tables',
    timestamps: true,
    underscored: true
});

// Définition des relations
const PlanTable = require('./planTableModel');
Table.belongsTo(PlanTable, { foreignKey: 'id_plantable'});


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