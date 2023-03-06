// const jsonld = require('jsonld');
const fs = require("fs")
const { parse } = require("path")

async function loadData(url){
    return await fetch(url).then(res => res.text())
}

// TODO: Fix this or replace with a package. This doesnt consider that not all ISO dates include every parameter ('PT20M' is valid for example)
/**
 * Converts from ISO 8601 format to minutes
 * @param isoStr - string in ISO 8601 format
 * @returns 
 */
const isoToMinutes = isoStr => {
    // Check that string exists
    if(!isoStr){
        return undefined
    }
    
    const hours = isoStr.indexOf("H") == -1 ? 0 : parseInt(isoStr.substring(isoStr.indexOf("T") + 1, isoStr.indexOf("H")))
    const mins = isoStr.indexOf("M") == -1 ? 0 : parseInt(isoStr.substring(isoStr.indexOf("H") + 1, isoStr.lastIndexOf("M")))
    return hours*60 + mins
}

const test1 = "https://www.foodnetwork.com/recipes/ina-garten/greek-salad-recipe-1948517"
const test2 = "https://cookieandkate.com/how-to-make-tzatziki/#tasty-recipes-25607-jump-target"
const test3 = "https://www.halfbakedharvest.com/honey-garlic-salmon-soba-noodle-bowls/"
const test4 = "https://cooking.nytimes.com/recipes/1890-roasted-brussels-sprouts-with-garlic?action=click&module=RecipeBox&pgType=recipebox-page&region=all&rank=0" // NYT

async function main(){
    const html = await loadData(test4)
    // const html = await loadData("https://www.onceuponachef.com/recipes/vietnamese-style-meatballs-with-chili-sauce.html#tabrecipe")
    
    // Alternative to fetching for testing using example HTML
    // const html = fs.readFileSync('./exampleHtml.txt').toString('utf-8')

    // TODO: There may be MULTIPLE application=ld+json tags
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

    // console.log(options[0])

    if(!options){ //edge case where no ld+json scripts exist
        console.log("No ld+json scripts found")    
    }
    // console.log(options)

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
    var recipeData = selectData(options)
    // console.log(recipeData)

    // TODO: Now we have found all occurenes, select the one with "@type":"Recipe" and use that for data
    // for(var i in options){
    //     var option = options[i]
    //     if(Object.keys(option).includes("@graph")){
    //         for(var i in option["@graph"]){
    //             var obj = option["@graph"][i]
    //             if(Object.keys(obj).includes("@type") && obj["@type"] == "Recipe"){
    //                 recipeData = obj
    //             }
    //         }
    //     } 
        
    //     if(!recipeData){
    //         if("@type" in Object.keys(option) && option["@type"] == "Recipe"){
    //             recipeData = obj
    //         } else{
    //             console.log("Incorrect format")
    //         }
    //     }
    // }

    // console.log(recipeData)

    // Now, let's pull the data we care about and format them
    const recipe = {
        "name": recipeData.name,
        "url": recipeData.url,
        "image": Array.isArray(recipeData.image) ? recipeData.image[0]?.url : recipeData.image?.url,
        "prepTime": isoToMinutes(recipeData.prepTime),
        "cookTime": isoToMinutes(recipeData.cookTime),
        "totalTime": isoToMinutes(recipeData.totalTime),
        "nutrition": recipeData.nutrition,
        "recipeIngredient": recipeData.recipeIngredient,
        "recipeInstructions": recipeData.recipeInstructions,
        "recipeYield": recipeData.recipeYield,
        "keywords": recipeData.keywords?.split(",")
    }
    
    console.log(recipe)
}

main()