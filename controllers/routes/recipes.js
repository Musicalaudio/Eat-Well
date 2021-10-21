const router = require('express').Router()
const {saveRecipe, unsaveRecipe} = require('../controllers/recipes')

// router.post('/save-recipe', saveRecipe)
router.route('/save-recipe').post(saveRecipe)

// router.delete('/unsave-recipe/:userId/:id', unsaveRecipe)
router.route('/unsave-recipe/:userId/:id').delete(unsaveRecipe)

module.exports = router;