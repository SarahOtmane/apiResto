const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


module.exports = router;