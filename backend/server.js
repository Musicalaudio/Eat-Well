//const session = require('express-session')
const mongoose = require('mongoose');
//const Redis = require('ioredis')
//const connectRedis = require('connect-redis')
//const {redisOptions} = require('./config/cache')
const {MONGO_URI, MONGO_OPTIONS} = require('./config/db')
const {createApp} = require("./app")
require('dotenv').config();

const port = process.env.PORT || 5000;

//const RedisStore = connectRedis(session)
//const client = new Redis(redisOptions)
//const store = new RedisStore({client})
const app = createApp()

mongoose.connect(MONGO_URI, MONGO_OPTIONS); //should we use await for mongoose.connect and should we wrap server with an IIFE?

mongoose.connection.once('open', () => {
     console.log("Mongodb database connection established successfully")
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})