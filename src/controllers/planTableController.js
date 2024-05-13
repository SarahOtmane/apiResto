const PlanTable = require('../models/planTableModel');
const Resto = require('../models/restoModel');



/**********************************************************
            MÉTHODE POUR ENREGISTRER UN PLAN DE TABLE
**********************************************************/
/*
    Fonction qui permet de créer un plan de table

    Les vérifications : 
        - l existance du resto
        - les plan de tables nont pas deja été ajoutés
        - il n ya pas de plan de travail qui correspond a cette salle

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
        if (!existingPlan) {
            return res.status(401).json({ message: 'Le plan de travail correpondant à cette salle existe déja.' });
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