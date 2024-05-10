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
    .put(adminController.putAdmin)
    .delete(adminController.deleteAdmin)

router
    .route('/admin')
    .get(jwtMiddleware.verifyToken, adminController.getAllAdmin)

router
    .route('/admin/id_user')
    .get(jwtMiddleware.verifyToken, adminController.deleteAdminByAdmin)

module.exports = router;