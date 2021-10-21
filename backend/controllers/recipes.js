const User = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse')

exports.saveRecipe = async (req, res, next) => {
    const {userId, id, title, image, imageType} = req.body;
    const recipe = {id, title, image, imageType}
    
    try{
        const user = await User.findOneAndUpdate({_id: userId}, {$push: {savedRecipes: [recipe]}}, {new: true})
        console.log(user)
        res.status(200).send(user)
    }catch(err){
        console.log(err)
        return next(new ErrorResponse("Could not save recipe", 404))
    }
}

exports.unsaveRecipe = async(req, res) => {
    const {userId, id} = req.params;
 
    try{
        const user = await User.findOneAndUpdate({_id: userId}, {$pull: {savedRecipes: {id: id}}}, {new: true})
        console.log(user)
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(404).json({err})
    }
}
