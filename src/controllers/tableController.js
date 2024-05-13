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





/**********************************************************
            MÉTHODE POUR MODIFIER UNE TABLE
**********************************************************/
/*
    Fonction qui permet de modifier une table

    Les vérifications : 
        - l existance du plan de table
        - l existance du numero de table dans le plan

*/
exports.updateTable = async(req, res) =>{
    try {
        const existingPlan = await PlanTable.findOne({ where: { id: req.params.id_planTable } });
        if (!existingPlan) {
            return res.status(404).json({ message: 'Le plan de table nexiste pas.' });
        }
        
        const existingTable = await Table.findOne({where: {
            id_planTable: req.params.id_planTable,
            id_table: req.params.id_table,
        }});
        if (existingTable) {
            return res.status(401).json({ message: 'La table existe pas.' });
        }

        const table = await Table.findOne({where: {
            id_planTable: req.params.id_planTable,
            numero: req.body.numero,
        }});
        if (table) {
            return res.status(401).json({ message: 'Une table portant ce numero existe déja' });
        }
        
        await table.update({
            id_planTable: req.params.id_planTable,
            numero: req.body.numero,
            nbPlaces: req.body.nbPlaces,
            taken: false,
        });

        res.status(201).json({ 
            message: `Table mis à jour avec succès` 
        });

    } catch (error) {
        res.status(500).json({message: "Erreur lors du traitement des données."});
    }
}