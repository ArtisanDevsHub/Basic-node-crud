const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();
const passwordHandler = require('../utils/passwordHandler');




router.get('/user-signup',(req, res)=> res.render('users/signup'));


router.post('/user-create', async (req, res)=>{
    let user = UserModel(req.body);
    await user.save();
    req.session.user = user;
    res.redirect('/notes');

});

router.get('/user-login',(req, res)=>{
    //show login page
    res.render('users/login');
});


router.post('/user-login', async (req, res)=>{
    let msg  = 'username or password is not matching';
    
    const {username, password} = req.body;
    
    let user = await UserModel.findOne({username});
    if (!user)
        res.send(msg);

    let isMatch = await passwordHandler.isPasswordMatching(password, user.password);
    if(!isMatch)
        res.send(msg);

    req.session.user = user;

    res.redirect('/notes');
});

router.post('/user-logout', async (req, res)=>{
    req.session.destroy();
    res.redirect('/user-login');
});


module.exports = router;
