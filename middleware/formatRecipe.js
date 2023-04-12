const moment = require('moment');

/**
 * Converts from ISO 8601 format to minutes
 * @param isoStr - string in ISO 8601 format
 * @returns 
 */
const isoToMinutes = isoStr => {
    if(!isoStr){
        return undefined
    }

    return moment.duration(isoStr).asMinutes();
}

const parseIngredient = ingredientString => {
    // Split the ingredient string into an array of words
    const words = ingredientString.trim().split(' ')

    // Checks if a word is in the approved unit array
    function isUnit(word) {
        // Define an array of common units of measurement
        const units = ['teaspoon', 'teaspoons', 'tsp', 'tablespoon', 'tablespoons', 'tbsp', 'cup', 'cups', 'ounce', 'ounces', 'oz', 'pound', 'pounds', 'lb', 'lbs', 'g', 'gram', 'grams', 'kg', 'kilogram', 'kilograms'];
        
        // Check if the word is in the units array
        return units.includes(word.toLowerCase());
    }

    // Find the index of the word that contains the unit of measurement
    let unitIndex = -1;
    for (let i = 0; i < words.length && unitIndex == -1; ++i) {
        if (isUnit(words[i])) {
            unitIndex = i;
        }
    }

    const amount = unitIndex !== -1 ? words.slice(0, unitIndex).join(' ') : words[0]
    const unit = unitIndex !== -1 ? words[unitIndex] : undefined
    const name = unitIndex !== -1 ? words.slice(unitIndex + 1).join(' ') : words.slice(1).join(' ')

    const parseAmount = amnt => {
        // Check if the string is a fraction
        if (/\d+\/\d+/.test(amnt)) {
            // Split the string into the numerator and denominator
            const [numerator, denominator] = amnt.split('/').map(Number);
            // Convert the fraction to a decimal number
            const decimal = numerator / denominator;
            // Return the decimal number
            return decimal;
        } else{
            return isNaN(amnt) ? undefined : parseInt(amnt)
        }
    }

    const numericAmount = parseAmount(amount)

    // Return the parsed ingredient object
    return {
        amount: numericAmount,
        unit: numericAmount ? unit : undefined,
        name: numericAmount ? name : ingredientString
    }
}

const parseIngredientsArray = ingredients => ingredients.map(ing => parseIngredient(ing))

// TODO: Consider checking if instructions are nested inside one big thing of text and pulling those options out in a future version
const handleInstructions = instructions => {
    // Check if we have type HowToStep for each element and change to just strings
    const cleanInstructions = typeof instructions[0] === "object" && instructions[0] !== null ? 
        instructions.map(el => el.text): 
        instructions
    
    const instructionBlobRegex = /^\d+\.\s.*$/
    if(cleanInstructions.length == 1 && instructionBlobRegex.test(cleanInstructions[0])){
        const lines = cleanInstructions[0].split(/(?=\d+\.\s)/);
        const splitInstructions = [];

        lines.forEach(line => {
            const match = line.match(/^\d+\.\s(.*)/);
            if (match) {
                splitInstructions.push(match[1].trim());
            }
        })

        return splitInstructions;
    } else{
        return cleanInstructions
    }
}

const handleYield = yield => {
    if(Array.isArray(yield)){
        yield = yield[0]
    }

    if(!isNaN(yield)){
        yield += " servings"
    }

    return yield
}

const handleNutrition = nutrition => {
    if(!nutrition){
        return undefined
    }

    return {
        servings: nutrition?.servingSize,
        calories: nutrition?.calories,
        fat: nutrition?.fatContent,
        carbs: nutrition?.carbohydrateContent,
        protein: nutrition?.proteinContent
    }
}

const handleImage = img => {
    const imgObj = Array.isArray(img) ? img[0] : img

    return typeof imgObj === "object" ? imgObj?.url : imgObj
}

const formatRecipe = (recipeData, recipeUrl) => {
    const recipe = {
        "title": recipeData?.name?.trim(),
        "url": recipeUrl,
        "imageUrl": handleImage(recipeData?.image),
        // "imageUrl": Array.isArray(recipeData?.image) ? recipeData?.image[0]?.url : recipeData?.image?.url,
        "prepTime": isoToMinutes(recipeData?.prepTime),
        "cookTime": isoToMinutes(recipeData?.cookTime),
        "totalTime": isoToMinutes(recipeData?.totalTime),
        "nutrition": handleNutrition(recipeData?.nutrition),
        "ingredients": recipeData?.recipeIngredient,
        // "ingredients": parseIngredientsArray(recipeData?.recipeIngredient),
        "instructions": handleInstructions(recipeData?.recipeInstructions),
        "yield": handleYield(recipeData?.recipeYield),
        "cuisine": Array.isArray(recipeData?.recipeCuisine) ? recipeData[0]?.recipeCuisine?.trim().toLowerCase() : recipeData?.recipeCuisine?.trim().toLowerCase(),
        "tags": recipeData?.keywords?.split(",").map(keyword => keyword.trim().toLowerCase())
    }
    
    // Two of prepTime, cookTime, totalTime are defined meaning we can decipher the remaining variable 
    if([recipe.prepTime, recipe.cookTime, recipe.totalTime].filter(v => typeof v == "undefined").length == 1){
        if(!recipe.prepTime){
            recipe.prepTime = recipe.totalTime - recipe.cookTime
        } else if(!recipe.cookTime){
            recipe.cookTime = recipe.totalTime - recipe.prepTime
        } else{
            recipe.totalTime = recipe.prepTime + recipe.cookTime
        }
    }

    return recipe
}

module.exports = formatRecipe