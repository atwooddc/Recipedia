const express           = require('express');
const router            = express.Router();
const parseRecipe       = require('../middleware/parseRecipe')
// const auth              = require('../middleware/auth')
// const Recipe            = require('../models/recipe.model');
// const User            = require('../models/user.model');

// @route       GET api/recipes
// @desc        Get all recipes
// @access      Public
router.get('/', (req, res) => {
    Recipe.find({})
        .then(recipes => res.send(recipes))
        .catch(err => {console.log(err)})
})

// @route       GET api/recipe/:id
// @desc        Get a recipe by its ID
// @access      Public
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then(course => res.send(course))
        .catch(err => {console.log(err)})
})

// @route       POST api/recipe
// @desc        Create a new recipe with form
// @access      Private
router.post('/', auth, async (req, res) => {
    // TODO: Validate recipe
    const recipe = true // Replace with recipe validation function

    await Recipe.create(recipe)
        .then(recipe => newRecipe = recipe)
        .catch(err => res.send(err))
})

// @route       POST api/recipe/:url
// @desc        Create a new recipe using URL parsing
// @access      Private
router.post('/:url', auth, async (req, res) => {
    // Check if recipe already exists by searching for URL
    var recipe = false // switch this to searching for recipe in DB (if doesnt exist return undefined)
    
    // If recipe doesn't exist, create a new one
    var newRecipe
    if(!recipe){ 
        recipe = await parseRecipe(req.params.url)
        
        // TODO: Validate recipe

        await Recipe.create(recipe)
            .then(recipe => newRecipe = recipe)
            .catch(err => res.send(err))
    } else{
        newRecipe = recipe
    }

    // If something goes wrong, send an error
    
})

// @route       PUT api/courses/:id
// @desc        Update course of the provided id by parameters in body
// @access      Public
router.put('/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedRecipe => res.send(updatedRecipe))
        .catch(err => res.send(err))
})

// @route       DELETE api/recipe/reset
// @desc        Clear all recipes from DB
// @access      Public
router.delete('/reset', (req, res) => {
    Course.deleteMany({})
        .then(resp => res.send({
            message: `Successfully deleted ${resp.deletedCount} record${resp.deletedCount != 1 ? "s" : ""}`
        }))
        .catch(err => console.log(err))
})

module.exports = router; 