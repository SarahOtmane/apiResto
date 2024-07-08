# Module de réservation de restaurants
Cette application est une API REST qui gère les reservations de restaurants.

## Prérequis
- Docker desktop
- Docker compose
- NodeJs et npm

## Installation
1. Clonez le projet : 
```bash 
git clone https://github.com/SarahOtmane/apiResto.git
cd apiResto
```

2. Créer un fichier .env à la racine du projet.

3. Copier le contenu du fichier .env.example dans le fichier .env en configurant les paramètres
```bash 
DB_NAME=your_db_name(au choix)
DB_USER=your_db_user(au choix)
DB_PASSWORD=your_db_password(au choix)

JWT_KEY=your_jwt_secret(une chaine de caractère au choix)
```

## Démarrage
Pour démarrer l'application 
1. Lancer docker desktop.
2. Lancer la commande suivante dans le terminal :
```bash
    docker-compose up
```
L'application sera disponible sur http://localhost:3003 et phpMyAdmin sur http://localhost:8081.

### Documentation de l'api
La documentation Swagger est disponible à l'adresse http://localhost:3003/api-docs.

## Structure du Projet
1. compose.yaml : fichiers pour la config docker
2. .env : fichier de configuration des variables d'environnements
3. src : dossier contenant les fichiers de l'application
- app.js : Point d'entrée de l'application
- docs/config.js : Configuration Swagger pour la documentation API
- controllers : dossier contenant les fichiers de contrôleurs
- middlewares : dossier contenant les fichiers de middlewares
- models : dossier contenant les fichiers de modèles
- routes : dossier contenant les fichiers de routes
- package.json : Dépendances du projet et scripts npm.

## Dépendances et versions
- Version de NodeJs utilisée : v20.8.0
- Version de npm utilisée : 10.8.1
- Version de Docker utilisée : 24.0.6
- Version de Docker Compose utilisée : v2.22.0-desktop.2
- Autres dépendances : 
```bash 
"dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.9.7",
    "sequelize": "^6.37.3",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0",
    "supertest": "^7.0.0"
  }
```

## Licence
Ce projet est sous licence ISC.




