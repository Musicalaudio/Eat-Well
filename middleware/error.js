const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message;

    if(err.code === 11000){
        const message = `Duplicate Field Value Enter`;
        
        // const message =  Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    else if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new  ErrorResponse(message, 400);
    }

    res.status(error.status || 500).json({
        success: false,
        error: error.message||"Server Error"
    })
}

module.exports = errorHandler;