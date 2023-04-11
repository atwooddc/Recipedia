import React from "react";
import "./my-recipes.styles.css";

import RecipePreview from "../../components/recipe-preview/recipe-preview.component";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import useAuth from "../../hooks/useAuth";

const MyRecipesPage = () => {
    const {auth} = useAuth()
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    return (
        <div className="my-recipes-page">
            <ThemeProvider theme={theme}>
                <Container sx={{ py: 8 }} maxWidth="md" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h2 style={{color: "var(--dark-gray)"}}>Hope you're hungry!</h2>
                <br/>
                    <Grid container spacing={4}>
                        {
                            auth.recipes?.map((recipe) => (
                                <RecipePreview data={recipe} key={recipe._id}/>
                            ))
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default MyRecipesPage;
