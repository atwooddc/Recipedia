import React from "react";
import { useNavigate } from "react-router-dom";

import "./my-recipes.styles.css";

import RecipePreview from "../../components/recipe-preview/recipe-preview.component";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const MyRecipesPage = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const dummyRecipes = [
        {
            id: 1,
            title: "Asian Radish Salad",
            img: "https://static01.nyt.com/images/2020/10/07/dining/04HealthyRoundup-Chicken-and-Cabbage/merlin_173165028_672c579b-817d-4be9-9c06-2c5d75334792-videoSixteenByNine3000.jpg",
            desc: "Light, refreshing side for any dish",
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

    const navigate = useNavigate();

    return (
        <div className="my-recipes-page">
            <h1>MyRecipesPage</h1>
            <br />
            <ThemeProvider theme={theme}>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {dummyRecipes.map((recipe) => (
                            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                    onClick={() =>
                                        navigate(`../recipe/${recipe.id}`)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={
                                            {
                                                // 16:9
                                            }
                                        }
                                        image={recipe.img}
                                        alt="recipe"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {recipe.title}
                                        </Typography>
                                        <Typography>{recipe.desc}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                navigate(
                                                    `../recipe/${recipe.id}`
                                                )
                                            }
                                        >
                                            View
                                        </Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default MyRecipesPage;
