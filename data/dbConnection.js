const {MongoClient} = require('mongodb');

const conString = process.env.DATABASE_URL;

const client =  new MongoClient(conString);

let db;


const connect = async () =>{
   await client.connect();
   db = client.db('notesApp'); 
   console.log("Mongo db is connected...");
}

const getDb = ()=>{
    if (!db){
        connect();
    }
    return db;
}

module.exports = {connect, getDb};
