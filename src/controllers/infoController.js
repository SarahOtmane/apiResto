const Info = require('../models/infoModel.js');
const Resto = require('../models/restoModel.js');


/**********************************************************
            MÉTHODE POUR CREER UNE INFO
**********************************************************/
/*
    Fonction qui permet à l'admin de créer une info

    Les vérifications : 
        - l existance du resto
        - l existance de l info

*/
exports.createAnInfo = async (req, res) => {
    try {
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }

        const existingInfo = await Info.findOne({ where: { name: req.body.name, id_resto: req.params.id_resto} });
        if (existingInfo) {
            return res.status(401).json({ message: 'Cette info existe déjà.' });
        }

        let newInfo = await Info.create({
            name: req.body.name,
            content: req.body.content,
            id_resto: req.params.id_resto
        });

        res.status(201).json({ 
            message: `Info créé avec succès. Le nom : ${newInfo.name}` 
        });
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**********************************************************
            MÉTHODE POUR LISTER UNE INFO
**********************************************************/
/*
    Fonction qui permet de lister une info

    Les vérifications : 
        - Vérifier que l'info existe

*/
exports.getAnInfo = async (req, res) => {
    try {
        const info = await Info.findOne({ where: { id: req.params.id_info } });

        if (!info) {
            return res.status(404).json({ message: 'Info non trouvé.' });
        }

        res.status(201).json(info);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**********************************************************
            MÉTHODE POUR MODIFIER UNE INFO
**********************************************************/
/*
    Fonction qui permet de modifier une info

    Les vérifications : 
        - Vérifier que l'info existe

*/
exports.putAnInfo = async (req, res) => {
    try {
        const info = await Info.findOne({ where: { id: req.params.id_info } });

        if(!info){
            return res.status(404).json({ message: 'Information non trouvé.' });
        }

        const existingInfo = await Info.findOne({ where: { name: req.body.name, id_resto: info.id_resto} });
        if (info.name != req.body.name && existingInfo) {
            return res.status(401).json({ message: 'Cette info existe déjà.' });
        }

        await info.update({ 
            content: req.body.content,
            name: req.body.content
        });

        
        res.status(201).json({ message: 'Information mise à jour avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR SUPPRIMER UNE INFO 
**********************************************************/
/*
    Fonction qui permet de supprimer une info

    Les vérifications : 
        - Vérifier que l'info existe

*/
exports.deleteAnInfo = async (req, res) => {
    try {
        
        const deletedInfo = await Info.destroy({
            where: { id: req.params.id_info }
        });
        
        if (!deletedInfo) {
            return res.status(404).json({ message: 'Information non trouvé.' });
        }

        res.status(201).json({ message: 'Information supprimée avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR LISTER TOUTES LES INFO
**********************************************************/
/*
    Fonction qui permet de lister toutes les info

    Les vérifications : 
        - Vérifier que les info existent

*/
exports.getAllInfo = async (req, res) => {
    try {
        const infos = await Info.findAll();
        
        if (!infos) {
            return res.status(404).json({ message: 'Auncune information trouvée.' });
        }

        res.status(201).json(infos);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};