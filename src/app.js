const connectDatabase = require('./services/ConnexionDB');
const startServer = require('./services/Serveur');
const createTables = require('./services/TableManager');


async function main() {
    try {
        await connectDatabase();
        await createTables();
        startServer(3030);
    } catch (error) {
        console.error('Erreur lors du démarrage de l\'application :', error);
    }
}

main();
