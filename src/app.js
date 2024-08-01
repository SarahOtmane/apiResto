const connectDatabase = require('./services/ConnexionDB');
const startServer = require('./services/Serveur');
const createTables = require('./services/TableManager');


async function main() {
    try {
        const sequelize = await connectDatabase();
        await createTables(sequelize);
        startServer(3004);
    } catch (error) {
        console.error('Erreur lors du démarrage de l\'application :', error);
    }
}

main();
