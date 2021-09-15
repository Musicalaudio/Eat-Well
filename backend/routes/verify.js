const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require('dotenv').config();

// check json web token exists & is verified
router.get('/verifyAuth', (req, res) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                //res.send({route: '/sign-in'})
            }else{
                //console.log("Decoded Token: ", decodedToken)
                console.log('valid token')
                res.status(200).json({verifiedToken: true})
            }
        })
    }else{
      res.status(200).json({verifiedToken: false})  
      //res.send({route: '/sign-in'})
    }
});

// check current user
router.get('/checkUser', (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        //res.locals.user = null;
        res.status(200).json({user: null})
      } else {
        let user = await User.findById(decodedToken.id);
        //res.locals.user = user;
        res.status(200).json({user: user})
      }
    });
  } else {
    //res.locals.user = null;
    res.status(200).json({user: null})
  }
});


module.exports = router;