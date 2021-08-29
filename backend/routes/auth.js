const router = require('express').Router()
const User = require('../models/user.model')

//handle errors
const handleErrors = (err) => {
    //console.log(err.message, err.code)
    let errors = {email: "", password: ""};
    
    if(err.code === 11000){
        errors.email = 'that email is already registered'
        return errors;
    }


    //validation errors
    if(err.message.includes("user validation failed")){
        //console.log('array: ', Object.values(err.errors)) //each error object has a property object
        Object.values(err.errors).forEach(({properties}) => {  //for each property for each error object...      
            errors[properties.path] = properties.message 
        })
    }
    return errors;
}


router.post('/sign-up', async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    
    try{
        const user = await User.create({email, password})
        res.status(201).json(user)
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }
});

router.post('/sign-in', async (req, res, next) => {
    res.send('sign-in route')
});

router.post('/refresh-token', (req, res, next) => {
    res.send('refresh-token route')
});

router.delete('/log-out', (req, res, next) => {
    res.send('logout route')
});

module.exports = router;