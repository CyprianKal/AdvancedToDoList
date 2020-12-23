const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) =>{
    res.send("we are on home");
})
//Import routes

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);
//Connect
mongoose.connect( 
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    ( ) => {
    console.log('connected to DB!')
})
//ROUTES
app.listen(3000, () => {
    console.log('Server listening at port 3000!')
})