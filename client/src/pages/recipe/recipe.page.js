import React, { useEffect, useState } from "react";
import CustomTextArea from "../../components/custom-textarea/custom-textarea.component";
import { Kitchen } from "@mui/icons-material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useParams } from "react-router-dom";
import { addBaseUrlClient } from "../../utils/getBaseClientUrl";
import { makeStyles } from "@material-ui/core/styles";
import FastfoodIcon from "@material-ui/icons/Fastfood";

import "./recipe.styles.css";
const defaultImageUrl =
    "https://static.vecteezy.com/system/resources/previews/002/621/029/original/chef-recipe-book-kitchen-utensil-line-style-icon-free-vector.jpg";

const dummyRecipeData = {
    title: "Loading....",
    ingredients: [""],
    steps: [""],
    notes: "",
};

const RecipePage = () => {
    const { id: recipeId } = useParams();
    const [recipe, setRecipe] = useState(dummyRecipeData);
    const [editMode, setEditMode] = useState(false);

    // This is where we make a call to the API to pull in data for the specific recipe
    // NOTE: For now, I will use dummy data and we will replace that later
    useEffect(() => {
        fetch(addBaseUrlClient(`recipe/${recipeId}`), {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((json) => setRecipe(json));
    }, [recipeId]);

    useEffect(() => {
        console.log(recipe);
    }, [recipe]);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    return (
        <div className="recipe-page">
            <div className="recipe-info" mt={10}>
                <div class="container">
                    <div class="content">
                        <h1 className="recipe-title">{recipe?.title}</h1>
                    </div>
                    {recipe.imageUrl && (
                        <div className="recipe-img-container">
                            <img
                                src={
                                    recipe?.imageUrl
                                        ? recipe.imageUrl
                                        : defaultImageUrl
                                }
                                alt={recipe?.title}
                            />
                        </div>
                    )}{" "}
                </div>
                {/* 
                <div className="recipe-header">
                    {recipe.imageUrl && (
                        <div className="recipe-img-container">
                            <img
                                src={
                                    recipe?.imageUrl
                                        ? recipe.imageUrl
                                        : defaultImageUrl
                                }
                                alt={recipe?.title}
                            />
                        </div>
                    )}
                    <h1 className="recipe-title">{recipe?.title}</h1>
                </div>
                */}

                <div className="recipe-details-container">
                    {recipe.servings && (
                        <p>{`Serving size: ${recipe.servings}`}</p>
                    )}
                    {recipe.cookTime && (
                        <p>{`Cook Time: ${recipe?.cookTime}`}</p>
                    )}
                    {recipe.prepTime && (
                        <p>{`Prep Time: ${recipe?.prepTime}`}</p>
                    )}

                    {recipe.yield && <p>{`Yield: ${recipe?.yield}`}</p>}
                    {recipe.cuisine && <p>{`Cuisine: ${recipe?.cuisine}`}</p>}
                    <div className="recipe-ingredients-container">
                        <div className="recipe-details">
                            <h3>
                                <Kitchen />
                                Ingredients{" "}
                            </h3>
                            <ul>
                                {recipe?.ingredients?.map((item) => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="recipe-steps">
                        <h3>
                            <ListAltIcon />
                            Steps
                        </h3>
                        <ol>
                            {recipe?.instructions?.map((step) => (
                                <li>{step}</li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        {recipe.tags && (
                            <React.Fragment>
                                <b>Tags: </b>
                                {recipe?.tags?.map((tag, index) => (
                                    <React.Fragment key={index}>
                                        <span>{tag}</span>
                                        {index !== recipe.tags.length - 1 && (
                                            <span>, </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        )}
                    </div>
                </div>
                {/*<div className="notes-section">
                    <CustomTextArea
                        label="Notes"
                        type="text"
                        name="notes"
                        // value={recipe?.notes}
                        value="fix"
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                    <button
                        className="button"
                        onClick={() => setEditMode(!editMode)}
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                        }}
                    >
                        {`${editMode ? "Save" : "Edit"}`}
                    </button>
                    </div> */}
            </div>
            {/*
            <Card>
                <CardHeader title={recipe?.title} />
                <CardContent>
                    <Typography variant="body1" className={recipe?.title}>
                        Category
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <img
                                src={recipe?.imageUrl}
                                alt={recipe?.title}
                                width="100%"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <FastfoodIcon />
                                    </ListItemIcon>
                                    <ListItemText> Ingredients</ListItemText>
                                </ListItem>

                                {recipe?.ingredients.map((ingredient) => (
                                    <ListItem>
                                        <ListItemText primary={ingredient} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                    <List>
                        <ListItemText>Instructions:</ListItemText>
                        <ol>
                            {recipe?.instructions?.map((instruction) => (
                                <li>{instruction}</li>
                            ))}
                        </ol>
                    </List>
                </CardContent>
            </Card>
*/}
        </div>
    );
};

export default RecipePage;
