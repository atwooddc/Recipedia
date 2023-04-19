const formatRecipe = require("./formatRecipe");

const parseRecipe = async (url) => {
    const html = await fetch(url)
        .then((res) => res.text())
        .catch((err) => `Failed to grab HTML: ${err.message}`);

    // There may be multiple application=ld+json tags
    const ldjson_occurences = [
        ...html.matchAll(new RegExp("application/ld+", "gi")),
    ].map((a) => a.index);

    const options = [];
    for (var i = 0; i < ldjson_occurences.length; ++i) {
        const findScript = html.substring(ldjson_occurences[i]);
        const beginTrim = findScript.substring(findScript.indexOf(">") + 1);
        const metadata = beginTrim
            .substring(0, beginTrim.indexOf("</script>"))
            .trim();

        const parsed = JSON.parse(metadata);
        const obj = Array.isArray(parsed) ? parsed[0] : parsed;
        options.push(obj);
    }

    const selectData = (options) => {
        for (var i in options) {
            var option = options[i];
            if (Object.keys(option).includes("@graph")) {
                for (var i in option["@graph"]) {
                    var obj = option["@graph"][i];
                    if (
                        Object.keys(obj).includes("@type") &&
                        obj["@type"] == "Recipe"
                    ) {
                        return obj;
                    }
                }
            }

            if (
                Object.keys(option).includes("@type") &&
                option["@type"] == "Recipe"
            ) {
                return option;
            }
        }

        return undefined;
    };

    // Now we have found all occurenes, select the one with "@type":"Recipe" and use that for data
    var recipeData = selectData(options);

    if (!recipeData) {
        throw Error("No JSONLD data");
    }

    // Now, let's pull the data we care about, format, and return
    try {
        return formatRecipe(recipeData, url);
    } catch (err) {
        throw Error(`Error formatting recipe: ${err.message}`);
    }
};

module.exports = parseRecipe;

// const test1 = "https://www.foodnetwork.com/recipes/ina-garten/greek-salad-recipe-1948517"
// const test2 = "https://cookieandkate.com/how-to-make-tzatziki/#tasty-recipes-25607-jump-target"
// const test3 = "https://www.halfbakedharvest.com/honey-garlic-salmon-soba-noodle-bowls/"
// const test4 = "https://cooking.nytimes.com/recipes/1890-roasted-brussels-sprouts-with-garlic?action=click&module=RecipeBox&pgType=recipebox-page&region=all&rank=0" // NYT

// async function main() {
//     console.log(await parseRecipe(test2))
// }

// main()
