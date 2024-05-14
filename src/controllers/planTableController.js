const PlanTable = require('../models/planTableModel');
const Resto = require('../models/restoModel');



/**********************************************************
            MÉTHODE POUR CRÉER UN PLAN DE TABLE
**********************************************************/
/*
    Fonction qui permet de créer un plan de table

    Les vérifications : 
        - l existance du resto
        - les plan de tables nont pas deja été ajoutés
        - il n ya pas de plan de table qui correspond a cette salle

*/
exports.createPlanTable = async(req, res) =>{
    try {
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }

        const planTables = await PlanTable.findAll({where: {id_resto: req.params.id_resto}});
        if(planTables.length === existingResto.nbSalles){
            return res.status(401).json({message: `Le restaurant ${existingResto.name} a ${existingResto.nbSalles} salle(s). Vous avez déja entré les plans de tables correspondants à toutes les salles.`})
        }
        
        const existingPlan = await PlanTable.findOne({where: {
            id_resto: req.params.id_resto,
            name: req.body.name,
        }});
        if (existingPlan) {
            return res.status(401).json({ message: 'Le plan de table correpondant à cette salle existe déja.' });
        }

        const planTable = await PlanTable.create({
            id_resto: req.params.id_resto,
            name: req.body.name,
            nbTables: req.body.nbTables,
            nbPlaces: req.body.nbPlaces,
            full: false,
        });

        res.status(201).json({ 
            message: `Plan de table crée avec succès` 
        });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}


/**********************************************************
            MÉTHODE POUR MODIFIER UN PLAN DE TABLE
**********************************************************/
/*
    Fonction qui permet de modifier un plan de table

    Les vérifications : 
        - l existance du resto
        - l existance du plan de table
        - il n ya pas de plan de table qui correspond a cette salle

*/
exports.updatePlanTable = async(req, res) =>{
    try {
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }

        const existingPlan = await PlanTable.findOne({where: {
            id_resto: req.params.id_resto,
            id: req.params.id_planTable,
        }});
        if (!existingPlan) {
            return res.status(401).json({ message: 'Le plan de table n existe pas.' });
        }

        const planTable = await PlanTable.findOne({where: {
            id_resto: req.params.id_resto,
            name: req.body.name,
        }});
        if (planTable) {
            return res.status(401).json({ message: 'Le plan de table correpondant à cette salle existe déja.' });
        }
        
        await planTable.update({
            name: req.body.name,
            nbTables: req.body.nbTables,
            nbPlaces: req.body.nbPlaces,
            full: false,
        });

        res.status(201).json({ 
            message: `Plan de table mis à jour avec succès` 
        });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}




/**********************************************************
            MÉTHODE POUR SUPPRIMER UN PLAN DE TABLE
**********************************************************/
/*
    Fonction qui permet de supprimer un plan de table

    Les vérifications : 
        - l existance du resto
        - l existance du plan de table

*/
exports.deletePlanTable = async (req, res) => {
    try {
        const deletePlanTable = await PlanTable.destroy({
            where: { 
                id_resto: req.params.id_resto,
                id: req.params.id_planTable,
            }
        });

        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }
        
        if (!deletePlanTable) {
            return res.status(404).json({ message: 'Plan de table non trouvé.' });
        }

        res.status(201).json({ message: 'Plan de table supprimé avec succès.' });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};




/**********************************************************
            MÉTHODE POUR LISTER UN PLAN DE TABLE
**********************************************************/
/*
    Fonction qui permet de lister les details un plan de table

    Les vérifications : 
        - l existance du resto
        - l existance du plan de table

*/
exports.getPlanTable = async (req, res) => {
    try {
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }
        
        const existingPlan = await PlanTable.findOne({where: {
            id_resto: req.params.id_resto,
            id: req.params.id_planTable,
        }});
        if (!existingPlan) {
            return res.status(401).json({ message: 'Le plan de table n existe pas.' });
        }

        res.status(201).json(existingPlan);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};






/**************************************************************************
            MÉTHODE POUR LISTER TOUS LES PLAN DE TABLES DUN RESTO
**************************************************************************/
/*
    Fonction qui permet de lister tous les plans de tables dun resto

    Les vérifications : 
        - l existance du resto
        - l existance des plans de tables

*/
exports.getAllPlanTable = async (req, res) => {
    try {
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }
        
        const existingPlans = await PlanTable.findAll({where: {
            id_resto: req.params.id_resto
        }});
        if (!existingPlans) {
            return res.status(401).json({ message: 'Le plan de table n existe pas.' });
        }

        res.status(201).json(existingPlans);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
};