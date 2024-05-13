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
        


    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}