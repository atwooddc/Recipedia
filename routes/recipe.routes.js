const mongoose = require("mongoose");

/*

'/recipe/addByUrl/{siteUrl}':
post:
summary: Adds a recipe by url
operationId: addRecipeByUrl
parameters:
  - name: siteUrl
    in: path
    description: url of website to parse
    required: true
    schema:
      type: integer
      format: int64
responses:
  '200':
    description: successful operation
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Recipe'
requestBody:
  content:
    application/octet-stream:
      schema:
        type: string
        format: binary
'/recipe/{recipeId}/uploadImage':
post:
summary: uploads an image
operationId: uploadFile
parameters:
  - name: recipeId
    in: path
    description: ID of recipe to update
    required: true
    schema:
      type: integer
      format: int64
responses:
  '200':
    description: successful operation
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ApiResponse'
requestBody:
  content:
    application/octet-stream:
      schema:
        type: string
        format: binary
'/recipe/search':
get:
summary: queries recipes in a filterable manner
operationId: searchRecipes
parameters:
  - in: query
    name: offset
    schema:
      type: integer
    description: The number of items to skip before starting to collect the result set
  - in: query
    name: limit
    schema:
      type: integer
    description: The numbers of items to return
  - in: query
    name: ingredients
    schema:
      type: array
      items: 
        type: string
    description: Only returns recipes with specified tags
  - in: query
    name: tags
    schema:
      type: string
    description: Only returns recipes with specified tags
    
responses:
  '200':
    description: successful operation
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Recipe'
      application/xml:
        schema:
          $ref: '#/components/schemas/Recipe'
  '400':
    description: Invalid ID supplied
  '404':
    description: Recipe not found
    */

const express = require("express");
const router = express.Router();
//const validateRecipe    = require('../middleware/validateRecipe')
//const findRecipe        = require('../middleware/findRecipe')
//const auth = require("../middleware/auth");
const Recipe = require("../models/recipe.model");

// post:
// summary: Create a new recipe
// operationId: addRecipe
// responses:
//   '405':
//     description: Invalid input
// requestBody:
//   $ref: '#/components/requestBodies/Recipe'

// @route       POST api/recipes
// @desc        Create a new recipe and add to a user's recipe list
// @access      Private
router.post("/", async (req, res) => {
    const user = new Recipe(req.body);
    user.save()
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
    /*
    const validStr = await validateRecipe(req.body);
    if (validStr === "valid" || validStr === "exists") {
        let newRecipe;

        //if new recipe, create one
        if (validStr === "valid") {
            await Recipe.create(req.body)
                .then((Recipe) => (newRecipe = Recipe))
                .catch((err) => res.send(err));
        } else {
            newRecipe = await findRecipe(req.body);
        }

        let newStudentsList = newRecipe.students;
        newStudentsList.push(req.user);

        //update recipe student list to contain user
        Recipe.findByIdAndUpdate(newRecipe._id, { students: newStudentsList })
            .then((updatedRecipe) => res.send(updatedRecipe))
            .catch((err) => res.send(err));
    } else {
        res.status(400).send(validStr);
    }
    */
});

// put:
// summary: Update an existing recipe
// operationId: updateRecipe
// responses:
//   '400':
//     description: Invalid ID supplied
//   '404':
//     description: Recipe not found
//   '405':
//     description: Validation exception
// requestBody:
//   $ref: '#/components/requestBodies/Recipe'

// @route       PUT api/recipe/:id
// @desc        Update recipe of the provided id by parameters in body
// @access      Public
router.put("/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
        .then((updatedRecipe) => res.send(updatedRecipe))
        .catch((err) => res.send(err));
});

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

// '/recipe/{recipeId}':
// get:
// summary: Find recipe by ID
// description: Returns a single recipe
// operationId: getRecipeById
// parameters:
//   - name: recipeId
//     in: path
//     description: ID of recipe to return
//     required: true
//     schema:
//       type: integer
//       format: int64
// responses:
//   '200':
//     description: successful operation
//     content:
//       application/json:
//         schema:
//           $ref: '#/components/schemas/Recipe'
//       application/xml:
//         schema:
//           $ref: '#/components/schemas/Recipe'
//   '400':
//     description: Invalid ID supplied
//   '404':
//     description: Recipe not found
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

// delete:
// summary: Deletes a recipe
// operationId: deleteRecipe
// parameters:
//   - name: api_key
//     in: header
//     required: false
//     schema:
//       type: string
//   - name: recipeId
//     in: path
//     description: Recipe id to delete
//     required: true
//     schema:
//       type: integer
//       format: int64
// responses:
//   '400':
//     description: Invalid ID supplied
//   '404':
//     description: Recipe not found

// @route       DELETE recipe/:id
// @desc        Delete a recipe by ID
// @access      Private
router.delete("/:id", (req, res) => {
    Recipe.findByIdAndRemove(new mongoose.Types.ObjectId(req.params._id).trim()) //TODO I DONT KNOW IF THIS WORKS
        .catch((err) => res.status(404).send(err))
        .then(res.send(`Successfully deleted recipe ${req.params.id}`));
});

// @route       DELETE api/recipe/reset
// @desc        Clear all recipes from DB
// @access      Public
router.delete("/reset", (req, res) => {
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
