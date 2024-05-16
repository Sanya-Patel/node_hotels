const express = require('express')
const app = express();
const db = require('./db');  //read db file and connection is established
require('dotenv').config();

const PORT=process.env.PORT || 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //stores the data in req.body


app.get('/',(req,res)=>{
    res.send('Welcome to my hotel...How may I help you ?')
})


//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');


//Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, ()=>{
    console.log('Server listening at port 3000')
})