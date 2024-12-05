const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = new express();

const port = process.env.PORT;

require('./config/db')

app.listen(port,()=>{
    console.log(`The app is listening at port : ${port}`);
})

