const Table = require('../models/tableModel');
const PlanTable = require('../models/planTableModel');



/**********************************************************
            MÉTHODE POUR CRÉER UNE TABLE
**********************************************************/
/*
    Fonction qui permet de créer une table

    Les vérifications : 
        - l existance du plan de table
        - l existance du numero de table dans le plan

*/
exports.createTable = async(req, res) =>{
    try {
        const existingPlan = await PlanTable.findOne({ where: { id: req.params.id_planTable } });
        if (!existingPlan) {
            return res.status(404).json({ message: 'Le plan de table nexiste pas.' });
        }
        
        const existingTable = await Table.findOne({where: {
            id_planTable: req.params.id_planTable,
            numero: req.body.numero,
        }});
        if (existingTable) {
            return res.status(401).json({ message: 'Le numero de table existe déja.' });
        }

        const table = await Table.create({
            id_planTable: req.params.id_planTable,
            numero: req.body.numero,
            nbPlaces: req.body.nbPlaces,
            taken: false,
        });

        res.status(201).json({ 
            message: `Table crée avec succès` 
        });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}