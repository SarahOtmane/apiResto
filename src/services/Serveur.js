const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/config.js');

const adminRoute = require('./routes/adminRoute.js'); 
const restoRoute = require('./routes/restoRoute.js'); 
const planTableRoute = require('./routes/planTableRoute.js'); 
const infoRoute = require('./routes/infoRoute.js'); 
const tableRoute = require('./routes/tableRoute.js'); 
const reservationRoute = require('./routes/reservationRoute.js'); 


export default function Serveur(){
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json()); 

    // Configuration de Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Configuration des routes
    app.use('/admins', adminRoute);
    app.use('/restos', restoRoute);
    app.use('/planTables', planTableRoute);
    app.use('/infos', infoRoute);
    app.use('/tables', tableRoute);
    app.use('/reservations', reservationRoute);
}