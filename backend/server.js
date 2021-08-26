const express = require('express');
const cors = require('cors');
const createError = require('http-errors')
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
require('./helpers/init_mongoose')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

// mongoose.connection.once('open', () => {
//     console.log("Mongodb database connection established successfully")
// })

app.get('/', (req, res, next) => {
    res.send('Hello from express')
})

app.use('/auth', authRoute)


app.use(async (req, res, next) => {
    // const error = new Error("Not Found")
    // error.status = 404;
    // next(error)
    next(createError.NotFound("The page you're looking for does not exist"))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})