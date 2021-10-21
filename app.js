const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const newAuth = require('./routes/newAuth')
const private = require('./routes/private')
const recipes = require('./routes/recipes') 
const morgan = require('morgan')
const errorHandler = require('./middleware/error')


const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

const createApp = () => {
    const app = express();
    
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join('./client/build')));
        app.get("*", (req, res) => {
            res.sendFile('C:/Users/Jordan/Desktop/Eat-Well/client/build/index.html')
        })
    }
    // else{
    //     app.get('/', (req, res) => {
    //         res.send("API running")
    //     })
    // }

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

    app.use('/newAuth', newAuth)
    app.use('/private', private)
    app.use('/recipes', recipes)
    app.use(errorHandler)

    return app
}

module.exports = {createApp}