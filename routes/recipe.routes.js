const express = require("express");
const parseRecipe = require("../middleware/parseRecipe");
const router = express.Router();
const Recipe = require("../models/recipe.model");

// @route       GET api/recipe
// @desc        Get all recipes
// @access      Public
router.get("/", (req, res) => {
    Recipe.find({})
        .then((recipes) => res.send(recipes))
        .catch((err) => {
            console.log(err);
        });
});

// @route       GET api/Recipes/:id
// @desc        Get a Recipe by its ID
// @access      Public
router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then((Recipe) => res.send(Recipe))
        .catch((err) => {
            console.log(err);
        });
});

// @route       POST api/recipe
// @desc        Create a new recipe and add to a user's recipe list
// @access      Private
router.post("/", async (req, res) => {
    const recipe = new Recipe(req.body);
    recipe
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /recipe",
                createdRecipe: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

// @route       POST api/recipe/:url
// @desc        Create a new recipe using URL parsing
// @access      Private
// TODO: ADD BACK AUTH
router.post('/byurl', async (req, res) => {
    // Check if recipe already exists by searching for URL
    // var recipe = false // switch this to searching for recipe in DB (if doesnt exist return undefined)
    
    // // If recipe doesn't exist, create a new one
    // var newRecipe
    // if(!recipe){ 
    //     recipe = await parseRecipe(req.params.url)
        
    //     // TODO: Validate recipe

    //     await Recipe.create(recipe)
    //         .then(recipe => newRecipe = recipe)
    //         .catch(err => res.send(err))
    // } else{
    //     newRecipe = recipe
    // }
    
    // If something goes wrong, send an error
    const recipe = await parseRecipe(req.body.url)
    console.log(recipe)
    res.send(recipe)
})

// @route       PUT api/recipe/:id
// @desc        Update recipe of the provided id by parameters in body
// @access      Public
router.put("/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then((updatedRecipe) => res.send(updatedRecipe))
        .catch((err) => res.send(err));
});


// @route       DELETE recipe/:id
// @desc        Delete a recipe by ID
// @access      Private
router.delete("/:id", (req, res) => {
    var itemId = req.params.id;
    Recipe.findOneAndRemove({ _id: itemId })
        .catch((err) => res.status(404).send(err))
        .then(res.send(`Successfully deleted recipe ${req.params.id}`));
});

// @route       DELETE api/recipe/reset
// @desc        Clear all recipes from DB
// @access      Public
router.delete("/reset", (req, res) => {
    //TODO HASN'T BEEN TESTED
    Recipe.deleteMany({})
        .then((resp) =>
            res.send({
                message: `Successfully deleted ${resp.deletedCount} record${
                    resp.deletedCount != 1 ? "s" : ""
                }`,
            })
        )
        .catch((err) => console.log(err));
});

module.exports = router;
