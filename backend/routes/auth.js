const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require('dotenv').config();

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: "", password: ""};

    // incorrect email
    if (err.message === 'Incorrect Email') {
        errors.email = 'That email is not registered'; //later change this to incorrect email or password?
    }

    // incorrect password
    if (err.message === 'Incorrect Password') {
        errors.password = 'That password is incorrect'; //later change this to incorrect email or password?
    }

    //duplicate email
    if(err.code === 11000){
        errors.email = 'that email is already registered'
        return errors;
    }

    //validation errors
    if(err.message.includes("user validation failed")){
        //console.log('array: ', Object.values(err.errors)) //each error object has a property object
        Object.values(err.errors).forEach(({properties}) => {  //for each property for each error object...      
            errors[properties.path] = properties.message 
        });
    }

    return errors;
}

const maxAge = 60 * 60 * 24 * 3; // 3 days in seconds since tokens expect time in minutes
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {expiresIn: maxAge})  //signed with payload, secret and headers
}

router.post('/sign-up', async ( req, res ) => {
    const { email, password } = req.body
    
    try{
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000 }); //time is 3 days in milliseconds
        res.status(201).json({ user: user._id})
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
});

router.post('/sign-in', async (req, res) => {
    //res.send('sign-in route')
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000 }); //time is 3 days in milliseconds
        res.status(200).json({user: user._id})
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
});

router.get('/log-out', (req, res ) => {
    res.clearCookie('jwt');
    res.status(200).json({});
    //res.status(200).redirect('/');
});

module.exports = router;