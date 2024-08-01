const sequelize = require("sequelize"); //orm node js pour les bases de données relationnelles

export default function Connexion(){
    // Configuration de la base de données
    const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: "db",
        dialect: "mysql"
    });

    // Test de la connexion à la base de données
    db.authenticate()
        .then(() => {
            console.log("Connecté à la base de données MySQL!");
        })
        .catch(err => {
            console.error("Impossible de se connecter à la base de données:", err);
    });

    return sequelize.authenticate()
        .then(() => {
            console.log("Connecté à la base de données MySQL!");
        })
        .catch(err => {
            console.error("Impossible de se connecter à la base de données:", err);
        });
}