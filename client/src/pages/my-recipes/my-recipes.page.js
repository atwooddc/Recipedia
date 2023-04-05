import React, { useEffect, useState } from "react";
import "./my-recipes.styles.css";

import RecipePreview from "../../components/recipe-preview/recipe-preview.component";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const dummyRecipes = [
    {
        id: 1,
        title: "Eggplant Parmesean",
        img: "https://static.onecms.io/wp-content/uploads/sites/44/2021/02/08/grilled-eggplant-parmesan-2000.jpg",
        desc: "An instant crowd pleaser!",
    },
    {
        id: 2,
        title: "Paella",
        img: "https://www.foodandwine.com/thmb/bVcPTJTtq4HZz5tGS2d3C9m7kOg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-and-chorizo-paella-FT-RECIPE0221-3d6a72481b6a42d1ab64f440aae17b12.jpg",
        desc: "Spicy, stick-to-your-ribs saffron rice dish",
    },
    {
        id: 3,
        title: "Shrimp Tacos",
        img: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/04/Shrimp-Tacos-main-1.jpg",
        desc: "Perfect for a week night",
    },
    {
        id: 4,
        title: "Perfect Chocolate Chip Cookies",
        img: "https://cdn.shortpixel.ai/spai/q_lossless+w_1456+to_auto+ret_img/https://www.thebakingchocolatess.com/wp-content/uploads/2015/06/4VrueFFw-3.jpg",
        desc: "Our best tested recipe for the perfect cookies",
    },
    {
        id: 5,
        title: "Veggie Frittata",
        img: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2013%2F02%2F14%2FMR_Vegetable-Fritatta177.jpg",
        desc: "Vegetarian-friendly spinach, tomato, and broccoli frittata",
    },
];

const MyRecipesPage = () => {
    const [recipes, setRecipes] = useState([])
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    useEffect(() => {
        fetch("users/recipes", {method: "GET"})
            .then(recipeList => setRecipes(recipeList))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="my-recipes-page">
            <ThemeProvider theme={theme}>
                <Container sx={{ py: 8 }} maxWidth="md" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h2 style={{color: "var(--dark-gray)"}}>Hope you're hungry!</h2>
                <br/>
                    <Grid container spacing={4}>
                        {
                            recipes.map((recipe) => (
                                <RecipePreview data={recipe}/>
                            ))
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default MyRecipesPage;
