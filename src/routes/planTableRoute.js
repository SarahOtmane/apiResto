const express = require('express');
const router = express.Router();
const planTableController = require('../controllers/planTableController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router
    .route('/:id_resto')
    .all(jwtMiddleware.verifyToken)
    .post(planTableController.createPlanTable)






module.exports = router;