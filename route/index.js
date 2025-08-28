const noteRoute = require('./noteRoute');
const userRoute = require('./userRoute');

module.exports = (app)=>{
    app.use('/notes', noteRoute);
    app.use('/users', userRoute);
}
