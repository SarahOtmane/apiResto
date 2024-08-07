const Admin = require('../models/adminModel');
const Info = require('../models/infoModel');
const PlanTable = require('../models/planTableModel');
const Reservation = require('../models/reservationModel');
const Resto = require('../models/restoModel');
const Table = require('../models/tableModel');



async function TableManager(){
    try {
        await Resto.sync();
        await Admin.sync();
        await PlanTable.sync();
        await Table.sync();
        await Info.sync();
        await Reservation.sync();

        console.log('Tables créées');
    } catch (error) {
        console.error("Erreur lors de la création des tables :", error);
    }
}

module.exports = TableManager;