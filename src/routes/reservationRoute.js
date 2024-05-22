const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router 
    .route('/:id_resto/:id_plantable')
    .post(reservationController.createResa)

router 
    .route('/:id_resto/:id_plantable/:id_resa')
    .all(jwtMiddleware.verifyToken)
    .post(reservationController.getResa)

module.exports = router;