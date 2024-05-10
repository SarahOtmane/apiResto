const express = require('express');
const router = express.Router();
const restoController = require('../controllers/restoController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');



router
    .route('/')
    .all(jwtMiddleware.verifyToken)
    .post(restoController.createResto)
    .get(restoController.getAlResto)


router
    .route('/id_resto')
    .all(jwtMiddleware.verifyToken)
    .get(restoController.getResto)
    .put(restoController.putResto)
    .delete(restoController.deleteResto)


module.exports = router;