const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router
    .route('/:id_planTable')
    .all(jwtMiddleware.verifyToken)
    .post(tableController.createTable)


router  
    .route('/:id_planTable/:id_table')
    .put(tableController.updateTable)