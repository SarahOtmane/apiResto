const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router
    .route('/:id_resto')
    .all(jwtMiddleware.verifyToken)
    .post(infoController.createAnInfo)

router
    .route('/:id_info')
    .all(jwtMiddleware.verifyToken)
    .get(infoController.getAnInfo)
    .put(infoController.putAnInfo)
    .delete(infoController.deleteAnInfo)

router
    .route('/')
    .all(jwtMiddleware.verifyToken)
    .get(infoController.getAllInfo)



module.exports = router;