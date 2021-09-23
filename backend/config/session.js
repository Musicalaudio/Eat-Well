const {
    NODE_ENV = 'development',
    APP_PORT = 5000
} = process.env

const IN_PROD = NODE_ENV === 'production'

const HALF_HOUR = 1000 * 60 * 60  //one hour in 

const {
    SESSION_SECRET = `can you please keep this secret?`,
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT = HALF_HOUR
} = process.env

const sessionOptions = {
    secret: SESSION_SECRET,
    name:  SESSION_NAME,
    cookie: {
        maxAge: SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: 'none',
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
}

module.exports = {sessionOptions, IN_PROD, APP_PORT};