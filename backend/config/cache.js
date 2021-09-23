// const { redisOptions } = require("ioredis")

const {
    REDIS_PORT = 6379,
    REDIS_HOST = 'localhost',
    REDIS_PASSWORD = 'secret'
} = process.env

const redisOptions = {
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD    
}

module.exports = redisOptions;