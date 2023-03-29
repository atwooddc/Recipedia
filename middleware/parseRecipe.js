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

    // Return the parsed ingredient object
    return {
        amount: isNaN(amount) ? undefined : parseInt(amount),
        unit: isNaN(amount) ? undefined : unit,
        name: isNaN(amount) ? ingredientString : name
    }
}

const parseIngredientsArray = ingredients => ingredients.map(ing => parseIngredient(ing))

// TODO: Consider checking if instructions are nested inside one big thing of text and pulling those options out in a future version
const handleInstructions = instructions => {
    // We have type HowToStep for each element
    if(typeof instructions[0] === "object" && instructions[0] !== null){ 
        return instructions.map(el => el.text)
    }

    return instructions
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

const parseRecipe = async url => {
    const html = await fetch(url)
        .then(res => res.text())
        .catch("Failed to grab HTML")

    // There may be multiple application=ld+json tags
    const ldjson_occurences = [...html.matchAll(new RegExp("application/ld\+", 'gi'))].map(a => a.index)

    const options = []
    for(var i = 0; i < ldjson_occurences.length; ++i){
        const findScript = html.substring(ldjson_occurences[i])
        const beginTrim = findScript.substring(findScript.indexOf(">") + 1)
        const metadata = beginTrim.substring(0, beginTrim.indexOf("</script>")).trim()
        
        const parsed = JSON.parse(metadata)
        const obj = Array.isArray(parsed) ? parsed[0] : parsed
        options.push(obj)
    }

    // Edge case where no ld+json scripts exist
    if(!options){ 
        console.log("No ld+json scripts found")    
    }

    function selectData(options){
        for(var i in options){
            var option = options[i]
            if(Object.keys(option).includes("@graph")){
                for(var i in option["@graph"]){
                    var obj = option["@graph"][i]
                    if(Object.keys(obj).includes("@type") && obj["@type"] == "Recipe"){
                        return obj
                    }
                }
            }
            
            if(Object.keys(option).includes("@type") && option["@type"] == "Recipe"){
                return option
            }
        }

        return undefined
    }

    // Now we have found all occurenes, select the one with "@type":"Recipe" and use that for data
    var recipeData = selectData(options)

    // Now, let's pull the data we care about and format them
    const recipe = {
        "name": recipeData?.name,
        "url": recipeData?.url,
        "image": Array.isArray(recipeData?.image) ? recipeData?.image[0]?.url : recipeData?.image?.url,
        "prepTime": isoToMinutes(recipeData?.prepTime),
        "cookTime": isoToMinutes(recipeData?.cookTime),
        "totalTime": isoToMinutes(recipeData?.totalTime),
        "nutrition": recipeData?.nutrition,
        "ingredients": parseIngredientsArray(recipeData?.recipeIngredient),
        "instructions": handleInstructions(recipeData?.recipeInstructions),
        "yield": handleYield(recipeData?.recipeYield),
        "cuisine": recipeData?.recipeCuisine,
        "keywords": recipeData?.keywords?.split(",")
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

module.exports = parseRecipe

// const test1 = "https://www.foodnetwork.com/recipes/ina-garten/greek-salad-recipe-1948517"
// const test2 = "https://cookieandkate.com/how-to-make-tzatziki/#tasty-recipes-25607-jump-target"
// const test3 = "https://www.halfbakedharvest.com/honey-garlic-salmon-soba-noodle-bowls/"
// const test4 = "https://cooking.nytimes.com/recipes/1890-roasted-brussels-sprouts-with-garlic?action=click&module=RecipeBox&pgType=recipebox-page&region=all&rank=0" // NYT

// async function main() {
//     console.log(await parseRecipe(test1))
// }

// main()