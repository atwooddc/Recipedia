const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { User, UserSchema } = require("./user.model");

const TagSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = TagSchema;
module.exports = Tag = mongoose.model("tag", TagSchema);

const IngredientSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
});
module.exports = IngredientSchema;
module.exports = Ingredient = mongoose.model("ingredient", IngredientSchema);

const RecipeSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    ownerID: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [IngredientSchema], //ingredient or ingredient schema?
        required: true,
    },
    steps: {
        type: [String],
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
    recipeUrl: {
        type: String,
        required: false,
    },
    photoUrls: {
        type: [String],
        required: false,
    },
    tags: {
        type: [TagSchema],
        required: false,
    },
});

module.exports = RecipeSchema;
module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
