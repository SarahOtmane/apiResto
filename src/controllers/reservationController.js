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
        - Vérifier que le plan de table existe
        - Verifier que le plan de table n est pas full
        - Vérifier que le nombre de places libres > au nombre de couverts reserves
*/

exports.createResa = async(req, res) =>{
    try {
        //recup le resto en question
        const existingResto = await Resto.findOne({ where: { id: req.params.id_resto } });
        if (!existingResto) {
            return res.status(404).json({ message: 'Ce resto nexiste pas.' });
        }

        //recup le plan de tables du resto et verifier qu il n est pas full
        const existingPlanTable = await PlanTable.findOne({where: {id_resto: req.params.id_resto, id: req.params.id_plantable}});
        if (!existingPlanTable) {
            return res.status(404).json({ message: 'Plan de table inexistant' });
        }else if(existingPlanTable.full === true){
            return res.status(404).json({ message: 'Aucune place libre' });
        }

        let tables = await Table.findAll({ where: { id_planTable: req.params.id_plantable, taken: false } });

        //Recup le nb de places libres dans la salle
        let nbPlacesLibres = 0;
        tables.forEach(table => nbPlacesLibres += parseInt(table.nbPlace));

        //si le nb de places libres < nb de couverts reserve
        if(nbPlacesLibres < req.body.nbPlace){
            res.status(401).json({message: "Le nombre de places libres est inférieur au nombre de couverts reservés"});
        }

        let tableAReserve = [];
                
        //recup toutes les tables qui peuvent être reserve
        for(const table of tables){
            if(table.nbPlace >= req.body.nbPlace){
                tableAReserve.push(table);
            }
        }

        //si aucune table peut être reservée => voir si on peut coller des tables
            // exemple : [4, 4, 2, 2]
        if(tableAReserve.length === 0){
            tables.sort((a, b) => b.nbPlace - a.nbPlace); 

            let tab = [tables[0]];
            if( (tables[0].nbPlace + tables[tables.length-1].nbPlace) >= req.body.nbPlace){
                tab.push(tables[tables.length-1]);
            }
            else{
                let i = 1;
                let nb = parseInt(tables[0].nbPlace);
                while ((i<tables.length) && (nb<req.body.nbPlace)) {
                    tab.push(tables[i]);
                    nb += parseInt(tables[i].nbPlace);
                    i++;
                };
            }

            let numTable = '';

            //reserve les tables
            for ( i = 0; i < tab.length; i++) {
                await tab[i].update({
                    taken: true,
                });

                numTable += tab[i].numero + ',';
            }

            //mettre hors reservation le plan de table si ya plus aucune table libre
            tables = await Table.findAll({ where: { id_planTable: req.params.id_plantable, taken: false } });
            if(tables.length === 0){
                await existingPlanTable.update({
                    full: true
                })
            }

            //creer la reservation
            let reservation = await Reservation.create({
                email: req.body.email,
                phone: req.body.phone,
                name: req.body.name,
                date: req.body.date,
                heure: req.body.heure,
                nbPlace : req.body.nbPlace,
                numTable : numTable,
                id_resto: req.params.id_resto,
                id_planTable: req.params.id_plantable,
    
            });   

            return res.status(200).json(reservation);  
        }

        //si ya des tables qu'on peut reservé
            // Ranger le tab tableAReserve par ordre croissant du nbPlaces
            // creer la reservation avec la premiere table
        if(tableAReserve.length > 1) tableAReserve.sort((a, b) => a.nbPlace - b.nbPlace);

        const existingTable = await Table.findOne({where: {
            id_planTable: req.params.id_plantable,
            numero: tableAReserve[0].numero,
        }});

        await existingTable.update({
            taken: true,
        });

        tables = await Table.findAll({ where: { id_planTable: req.params.id_plantable, taken: false } });
        if(tables.length === 0){
            await existingPlanTable.update({
                full: true
            })
        }

        let reservation = await Reservation.create({
            email: req.body.email,
            phone: req.body.phone,
            name: req.body.name,
            date: req.body.date,
            heure: req.body.heure,
            nbPlace : req.body.nbPlace,
            numTable : tableAReserve[0].numero,
            id_resto: req.params.id_resto,
            id_planTable: req.params.id_plantable,

        });

        res.status(201).json(reservation);

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}