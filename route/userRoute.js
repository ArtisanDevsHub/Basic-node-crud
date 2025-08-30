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
    const {username, password} = req.body;
    let user = await UserModel.findOne({username});
    let isMatch = passwordHandler.isPasswordMatching(password, user.password);
    if(!isMatch)
        res.send('password is not matching');
    req.session.user = user;

    req.session.save((err) => {
        if (err) return res.status(500).send('Session save error');
    });
    res.redirect('/notes');
});


module.exports = router;
