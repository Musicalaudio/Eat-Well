const express = require('express')
const session = require('express-session')
const {sessionOptions} = require('./config/session')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const verifyAuth = require('./routes/verify')
const recipes = require('./routes/recipes')
const morgan = require('morgan')


const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

const createApp = (/*store*/) => {
    const app = express();

    // app.use(
    //     session({
    //         ...sessionOptions, 
    //         store
    //     })
    // )
    
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

    app.use('/auth', authRoute)
    app.use('/verify', verifyAuth)
    app.use('/recipes', recipes)

    return app
}

module.exports = {createApp}