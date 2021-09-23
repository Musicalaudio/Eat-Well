const {
    MONGO_USERNAME = 'mernapp',
    MONGO_PASSWORD = 'mernapp1234',
    MONGO_DATABASE = 'eat-well',
} = process.env

const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.disp0.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
//maybe use ${encodeURIComponent(MONGO_PASSWORD)} function on pasword


const MONGO_OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}

module.exports = {MONGO_URI, MONGO_OPTIONS};