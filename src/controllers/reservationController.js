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

*/

exports.createResa = async(req, res) =>{
    try {
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }
        
    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}