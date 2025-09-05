const { ObjectId } = require('mongodb');
const UserModel = require('../models/userModel');
const passwordHandler = require('../utils/passwordHandler');



const  createUser = async (req, res)=>{
    let user = UserModel(req.body);
    await user.save();
    req.session.user = user;
    res.redirect('/notes');
}

const logUserin = async (req, res)=>{
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
}

const logUserOut = async (req, res)=>{
    req.session.destroy();
    res.redirect('/users/user-login');
}


const showUserDashboard = async (req, res)=>{
    let currentUser = req.session.user;
    console.log(currentUser);
    res.render('users/user-dashboard', {user: currentUser});
}


module.exports = {
    createUser,
    logUserin,
    logUserOut,
    showUserDashboard
}