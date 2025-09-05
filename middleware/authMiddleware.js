const isAuthenticated = (req, res, next) => {
    if(req.session && req.session.user)
    return next();
    res.redirect('/users/user-login');
}

module.exports =  {
    isAuthenticated
}