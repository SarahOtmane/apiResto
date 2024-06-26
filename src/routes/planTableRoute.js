const express = require('express');
const router = express.Router();
const planTableController = require('../controllers/planTableController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router
    .route('/:id_resto')
    .all(jwtMiddleware.verifyToken)
    .post(planTableController.createPlanTable)
    .get(planTableController.getAllPlanTable)


router
    .route('/:id_resto/:id_planTable')
    .all(jwtMiddleware.verifyToken)
    .put(planTableController.updatePlanTable)
    .delete(planTableController.deletePlanTable)

router
    .route('/:id_resto/:id_planTable')
    .get(planTableController.getPlanTable)




module.exports = router;