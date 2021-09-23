const router = require('express').Router()
const User = require('../models/user.model')
const mongoose = require('mongoose')
const {Recipe} = require('../models/recipe.model')

router.post('/save-recipe', async(req, res) => {
    const {userId, id, title, image, imageType} = req.body;

    try{
        const recipe = {id, title, image, imageType}
        await User.findOneAndUpdate({_id: userId}, {$push: {savedRecipes: [recipe]}})
        //console.log("user: ", updatedUser) 
    }catch(err){
        console.log(err)
        res.status(404).json({err})
    }
})


router.delete('/unsave-recipe/:userId/:id', async(req, res) => {
    const {userId, id,} = req.params;
 
    try{
        await User.findOneAndUpdate({_id: userId}, {$pull: {savedRecipes: {id: id}}})
    }catch(err){
        console.log(err)
        res.status(404).json({err})
    }
})



module.exports = router;