const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_Admin, process.env.DB_PASSWORD, {
    host: "db",
    dialect: "mysql"
});


const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'admins',
    timestamps: true,
    underscored: true
});


// Synchronisation du modèle avec la base de données
(async () => {
    try {
        //ne pas forcer a supp et recréer la table
        await Admin.sync({ force: false });
        console.log("Modèle Admin synchronisé avec la base de données.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation du modèle Admin:", error);
    }
})();


module.exports = Admin;