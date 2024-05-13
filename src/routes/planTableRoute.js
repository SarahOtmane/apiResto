const express = require('express');
const router = express.Router();
const planTableController = require('../controllers/planTableController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router
    .route('/:id_resto')
    .all(jwtMiddleware.verifyToken)
    .post(planTableController.createPlanTable)


router
    .route('/:id_resto/:id_planTable')
    .all(jwtMiddleware.verifyToken)
    .put(planTableController.updatePlanTable)
    .delete(planTableController.deletePlanTable)
    .get(planTableController.getPlanTable)




module.exports = router;