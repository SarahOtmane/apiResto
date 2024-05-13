const express = require('express');
const sequelize = require("sequelize");

const app = express();
const port = 3004;


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


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


// Configuration de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuration des routes
const adminRoute = require('./routes/adminRoute.js'); 
app.use('/admins', adminRoute);

const restoRoute = require('./routes/restoRoute.js'); 
app.use('/restos', restoRoute);

const planTableRoute = require('./routes/planTableRoute.js'); 
app.use('/planTables', planTableRoute);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`L'application écoute sur le port ${port}`);
});


