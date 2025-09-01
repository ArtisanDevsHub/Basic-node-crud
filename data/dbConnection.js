const mongoose = require('mongoose');
const conString = process.env.DATABASE_URL;


const connectDb = async () =>{
   
    
    if(mongoose.connection.readyState == 1)return;
    
    try{
        await mongoose.connect(conString);
        console.log("Mongo db is connected...");
    }
    catch(e){
        console.log('Error connecting to mongodb server');
    }
}

module.exports = {connectDb};



