const noteRoute = require('./noteRoute');
const userRoute = require('./userRoute');
const {isAuthenticated} = require('../middleware/authMiddleware');

module.exports = (app)=>{
    app.use('/notes', isAuthenticated, noteRoute);
    app.use('/users', userRoute);
}
