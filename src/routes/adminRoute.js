const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router
    .route('/register')
    .post(adminController.registerAdmin)

router
    .route('/login')
    .post(adminController.loginAdmin)

router
    .route('/')
    .all(jwtMiddleware.verifyToken)
    .get(jwtMiddleware.verifyToken, adminController.getAllAdmin)
    .put(adminController.putAdmin)
    .delete(adminController.deleteAdmin)


module.exports = router;