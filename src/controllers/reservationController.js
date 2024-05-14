const Reservation = require('../models/reservationModel');
const Resto = require('../models/restoModel');
const PlanTable = require('../models/planTableModel');



/**********************************************************
            MÉTHODE POUR CRÉER UNE RESERVATION
**********************************************************/
/*
    Fonction qui permet à une personne de créer une reservation

    Les vérifications : 
        - Vérifier que le resto en question existe toujours
        - Vérifier que le nombre de places libres > nb couverts réservés
        - Vérifier qu'il y ait des tables qu'on peut groupés pour faire le nb de couverts

    Les étapes :
        - Récup les détails du resto
        - Récup les plans de tables du resto
        - Pour chaque plan de table récup les tables qui sont pas réservées
        - Véerifier que le nb de places libres > nb couverts
        - Voir si on peut coller des tables pour faire le nb de couverts
*/

exports.createResa = async(req, res) =>{
    try {
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }

        const existingPlanTable = await PlanTable.findAll({where: {id_resto: req.params.id_resto}});
        if (!existingPlanTable) {
            return res.status(404).json({ message: 'Aucun plan de table pour ce restaurant.' });
        }

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}