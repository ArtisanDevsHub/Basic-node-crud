require('dotenv').config();
const express = require('express');
const app = express();
const layout = require('express-ejs-layouts');
const path = require('node:path');
const {connectDb} = require('./data/dbConnection');
const session = require('express-session');

connectDb();

const { ObjectId } = require('mongodb');

app.use(session({
    secret: process.env.SESSION_SECRET, // Used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: { 
        secure: false, // Requires HTTPS
        httpOnly: true, // Prevents client-side JavaScript access
        maxAge: 1000 * 60 * 10 // Session expiration time in milliseconds (1 min)
    }
}));

app.use(express.static("path.join(__dirname, 'public')"));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
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
