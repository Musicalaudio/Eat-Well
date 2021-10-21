const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse')
require('dotenv').config();

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //The string will look like "Bearer 34d324ds8rgs7ya56" and we want the second part of that string
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        console.log('decoded:', decoded)
        const user = await User.findById(decoded.id)
        console.log("user:", user)
        
        if(!user){
            return next(new ErrorResponse("No user found with this id", 404))
        }

        req.user = user;
        next();
    }catch(err){
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }
}