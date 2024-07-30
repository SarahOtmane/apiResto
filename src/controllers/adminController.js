const Admin = require('../models/adminModel.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const argon2 = require('argon2');


/**********************************************************
            MÉTHODE POUR ENREGISTRER UN ADMIN
**********************************************************/
/*
    Fonction qui permet à une personne de créer un compte admin

    Les vérifications : 
        - Vérifier que l'email n'existe pas dans la base de donnée

*/
exports.registerAdmin = async (req, res) => {
    
};


/**********************************************************
            MÉTHODE POUR CONNECTER UN ADMIN
**********************************************************/
/*
    Fonction qui permet à une personne de se connecter à son compte admin

    Les vérifications : 
        - Vérifier que le compte associé à l'email existe
        - Vérifier que le mot de passe est bon

*/
exports.loginAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ where: { email: req.body.email } });

        if (!admin) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const validPassword = await argon2.verify(person.password, req.body.password);

        if (validPassword) {
            const adminData = {
                id: admin.id,
                email: admin.email,
                role: admin.role
            };
          
            const token = jwt.sign(adminData, process.env.JWT_KEY, { expiresIn: "30d" });

            res.status(201).json({ token });

        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR MODIFIER UN ADMIN
**********************************************************/
/*
    Fonction qui permet de modifier les info d'un admin

    Les vérifications : 
        - Vérifier que l'admin existe

*/
exports.putAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ where: { id: req.user.id } });

        if(!admin){
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // req.body.password = await bcrypt.hash(req.body.password, 10);

        await admin.update({ 
            password: req.body.password,
        });

        
        res.status(201).json({ message: 'Utilisateur mis à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR SUPPRIMER UN UTILISATEUR
**********************************************************/
/*
    Fonction qui permet de supprimer un compte utilisateur

    Les vérifications : 
        - Vérifier que l'utilisateur existe

*/
exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.destroy({
            where: { id: req.user.id }
        });
        
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(201).json({ message: 'Utilisateur supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};


/**********************************************************
            MÉTHODE POUR LISTER TOUS LES ADMIN
**********************************************************/
/*
    Fonction qui permet de lister tous les users

    Les vérifications : 
        - Vérifier que les users existent

*/
exports.getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        
        if (!admins) {
            return res.status(404).json({ message: 'Auncun utilisateur trouvé.' });
        }

        res.status(201).json(admins);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};