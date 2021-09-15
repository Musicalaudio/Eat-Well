const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const verifyAuth = require('./routes/verify')
const morgan = require('morgan')
require('dotenv').config();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

const app = express();
const port = process.env.PORT || 5000;

app.use(cors(corsOptions));

  app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

mongoose.connection.once('open', () => {
     console.log("Mongodb database connection established successfully")
})

app.use('/auth', authRoute)
app.use('/verify', verifyAuth)


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})