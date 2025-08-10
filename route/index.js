const noteRoute = require('./noteRoute');

module.exports = (app)=>{
    app.use('/notes', noteRoute);
}
