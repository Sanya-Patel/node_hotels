const mongoose = require('mongoose');
require('dotenv').config();

//Define the mongoose connection URL
// const mongoURL = process.env.MONGODB_LOCAL_URL;
const mongoURL = process.env.MONGODB_URL;


//Set up MongoDB connection 
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//Get the default connection
//Mongoose maintains a default connection obj representing the MongoDB connection
const db=mongoose.connection;


//Define event listener for db connection
db.on('connected', ()=>{
    console.log('Connected to MongoDB server');
});
db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
});
db.on('error', ()=>{
    console.log('MongoDB connection error');
});


//Export the databse connection
module.exports = db;