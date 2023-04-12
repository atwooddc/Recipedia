const express = require("express");
const parseRecipe = require("../middleware/parseRecipe");
const validateRecipe = require("../middleware/validateRecipe");
const router = express.Router();
const Recipe = require("../models/recipe.model");
const User = require("../models/user.model")
const auth = require("../middleware/auth")

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
// @desc        Creates a new recipe
// @access      Private
router.post("/", async (req, res) => {
    Recipe.create(req.body)
        .then(recipe => {
            res.status(201).send(recipe)
        })
        .catch(err => res.status(500).send(err))
});

// @route       POST api/recipe/byurl
// @desc        Create a new recipe using URL parsing
// @access      Private
router.post('/byurl', auth, async (req, res) => {
    // Search through recipe DB by url. If it exists already send that recipe. Else, move on to next block to create it.
    Recipe.findOne({url: req.body.url})
        .then(async recipe => {
            if(recipe){
                return res.send(recipe)
            }
            
            try{
                const newRecipe = await parseRecipe(req.body.url)
                
                // Validate the recipe
                if(!validateRecipe(newRecipe)){
                    throw new Error("Invalid recipe parsing")
                }
    
                console.log(newRecipe)
                // Create the recipe
                Recipe.create(newRecipe)
                    .then(recipe => {
                        res.send(recipe)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send(err)})
            } catch(err){
                console.log(err)
            }
        })
        .catch(err => res.send(err.message))
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
