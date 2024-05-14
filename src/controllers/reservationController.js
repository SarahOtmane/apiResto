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

exports.createResa = async() =>{
    
}