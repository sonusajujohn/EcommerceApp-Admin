const mongoose = require('mongoose');

const mongoDB_URL = process.env.MONGODB_URL;

mongoose.connect(mongoDB_URL,).then(()=>{
    console.log("DB CONNECTION ESTABLISHED SUCCESSFULLY");
}).catch(()=>{
    console.log("MONGO-DB CONNECTION FAILED");
});