const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router 
    .route('/:id_resto/:id_plantable')
    .all(jwtMiddleware.verifyToken)
    .post(reservationController.createResa)

module.exports = router;