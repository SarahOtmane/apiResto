const Resto = require('../models/restoModel');


/**********************************************************
            MÉTHODE POUR CREER UN RESTO
**********************************************************/
/*
    Fonction qui permet à l'admin de créer un resto

    Les vérifications : 
        - l existance du resto

*/
exports.createResto= async (req, res) => {
    try {
        const existingResto = await Resto.findOne({ where: { name: req.body.name } });
        if (existingResto) {
            return res.status(401).json({ message: 'Ce Resto existe déjà.' });
        }

        let newResto = await Resto.create(req.body);

        res.status(201).json({ 
            message: `Resto créé avec succès. Le nom : ${newResto.name}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**********************************************************
            MÉTHODE POUR LISTER UN RESTO
**********************************************************/
/*
    Fonction qui permet de lister un resto

    Les vérifications : 
        - Vérifier que le resto existe

*/
exports.getResto = async (req, res) => {
    try {
        const resto = await Resto.findOne({ where: { id: req.params.id_resto } });

        if (!resto) {
            return res.status(404).json({ message: 'Resto non trouvé.' });
        }

        res.status(201).json(resto);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**********************************************************
            MÉTHODE POUR MODIFIER UN RESTO
**********************************************************/
/*
    Fonction qui permet de modifier un resto

    Les vérifications : 
        - Vérifier que le resto existe

*/
exports.putResto = async (req, res) => {
    try {
        const resto = await Resto.findOne({ where: { id: req.params.id_info } });

        if(!resto){
            return res.status(404).json({ message: 'Resto non trouvé.' });
        }

        await resto.update({ 
            name: req.body.name,
        });

        
        res.status(201).json({ message: 'Resto mis à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR SUPPRIMER UN RESTO  
**********************************************************/
/*
    Fonction qui permet de supprimer un resto

    Les vérifications : 
        - Vérifier que le resto existe

*/
exports.deleteResto = async (req, res) => {
    try {
        
        const deleteResto = await Resto.destroy({
            where: { id: req.params.id_info }
        });
        
        if (!deleteResto) {
            return res.status(404).json({ message: 'Resto non trouvé.' });
        }

        res.status(201).json({ message: 'Resto supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR LISTER TOUS LES RESTO
**********************************************************/
/*
    Fonction qui permet de lister toutes les info

    Les vérifications : 
        - Vérifier que les info existent

*/
exports.getAlResto = async (req, res) => {
    try {
        const restos = await Resto.findAll();
        
        if (!restos) {
            return res.status(404).json({ message: 'Auncune information trouvée.' });
        }

        res.status(201).json(restos);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};