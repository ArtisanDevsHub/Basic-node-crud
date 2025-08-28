const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();



router.get('/user-signup',(req, res)=> res.render('users/signup'));


router.post('/user-create', async (req, res)=>{
    let user = UserModel(req.body);
    await user.save();

});

router.get('/user-login',(req, res)=>{
    //show login page
    res.render('users/login');
});


router.post('/user-login',()=>{
    //log user in
});


module.exports = router;
