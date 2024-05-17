const Reservation = require('../models/reservationModel');
const Resto = require('../models/restoModel');
const PlanTable = require('../models/planTableModel');
const Table = require('../models/tableModel');



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
        //recup le resto en question
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }

        //recup tous les plan de tables du resto qui ont encore des places libres
        const existingPlanTable = await PlanTable.findAll({where: {id_resto: req.params.id_resto, full: false}});
        if (!existingPlanTable) {
            return res.status(404).json({ message: 'Aucun plan de table pour ce restaurant.' });
        }

        let availablePlanTables =[];
        //Pour chaque plan de table
            //Recup les tables libres
            //vérifier que le nb de place libres de la salle > nb couverts reserves
            //Parcourir toutes les tables pour voir s'il ya une table qui peut etre reserve
        async function getTable(){
            for (const planTable of existingPlanTables){
                const tables = await Table.findAll({ where: { id_planTable: planTable.id, taken: false } });

                //Recup le nb de places libres dans la salle
                let nbPlacesLibres = 0;
                tables.forEach(table => nbPlacesLibres += parseInt(table.nbPlace));

                //si le nb de places libres > nb de couverts reserve
                let tableAReserve = [];
                if(nbPlacesLibres >= req.body.nbPlace){
                    availablePlanTables.push(planTable);
                    //recup toutes les tables qui peuvent être reserve
                    for(const table of tables){
                        if(table.nbPlace >= req.body.nbPlace){
                            tableAReserve.push(table);
                        }
                    }

                    //si aucune table peut être reservée => voir si on peut coller des tables
                    if(tableAReserve.length === 0){
                        
                    }
                }
            }
        }

        getTable();

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}