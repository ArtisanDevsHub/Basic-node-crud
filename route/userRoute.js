const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();
const userController = require('../controller/userController');
const {isAuthenticated} = require('../middleware/authMiddleware');


router.get('/user-signup',(req, res)=> res.render('users/signup'));
router.get('/user-login',(req, res)=>res.render('users/login'));

router.get('/user-dashboard', isAuthenticated, userController.showUserDashboard);

router.post('/user-create', userController.createUser);

router.post('/user-login', userController.logUserin);

router.post('/user-logout', userController.logUserOut);

module.exports = router;
