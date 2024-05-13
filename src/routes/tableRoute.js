const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


router
    .route('/:id_planTable')
    .all(jwtMiddleware.verifyToken)
    .post(tableController.createTable)