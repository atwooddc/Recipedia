const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: Number,
    unit: String
}, { _id: false });

module.exports = IngredientSchema;
module.exports = Ingredient = mongoose.model("ingredient", IngredientSchema);

const NutritionSchema = new Schema({
    servings: String,
    calories: String,
    fat: String,
    carbs: String,
    protein: String
}, { _id: false });

module.exports = NutritionSchema;
module.exports = Nutrition = mongoose.model("nutrition", NutritionSchema);

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: String,
    imageUrl: String,
    prepTime: Number,
    cookTime: Number,
    totalTime: Number,
    nutrition: {
        type: [NutritionSchema],
        default: null,
        required: false
    },
    ingredients: {
        type: [IngredientSchema],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    yield: String,
    cuisine: String,
    tags: [String]
});

module.exports = RecipeSchema;
module.exports = Recipe = mongoose.model("recipe", RecipeSchema);