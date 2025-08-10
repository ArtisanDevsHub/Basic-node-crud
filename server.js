require('dotenv').config();
const express = require('express');
const app = express();
const layout = require('express-ejs-layouts');
const path = require('node:path');
const {connect, getDb} = require('./data/dbConnection');
const noteController = require('./controller/noteController');

connect();

const { ObjectId } = require('mongodb');

console.log(process.env.DB_PORT);

app.use(express.static("path.join(__dirname, 'public')"));
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
app.use(layout);
//app.set('views', './viewsFolder')


require('./route')(app);



app.get('/', (req, res)=>{
    res.render('index');
});



app.listen('3000', ()=>{
    console.log('server running on port 3000');
});
