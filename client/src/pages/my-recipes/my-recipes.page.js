import React, {useState} from "react";
import "./my-recipes.styles.css";

import RecipePreview from "../../components/recipe-preview/recipe-preview.component";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button';

import useAuth from "../../hooks/useAuth";

import {addBaseUrlClient} from '../../utils/getBaseClientUrl'

const MyRecipesPage = () => {
    const [editMode, setEditMode] = useState(false)
    const {auth, setAuth} = useAuth()
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    const handleRemoveRecipe = recipeId => {
        fetch(addBaseUrlClient(`users/recipe/${recipeId}`), {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(json => setAuth(json))
            .catch((err) => console.error(err));
    }

    return (
        <div className="my-recipes-page">
            <ThemeProvider theme={theme}>
                <Container sx={{ py: 8 }} maxWidth="md" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <h2 style={{color: "var(--dark-gray)"}}>Hope you're hungry!</h2>
                    <br/>   
                    <Grid container spacing={4}>
                        <div className="btn-cont" style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                            <Button variant="contained" onClick={() => setEditMode(!editMode)}>{ editMode ? "Save" : "Edit" }</Button>
                        </div>
                        {
                            auth.recipes?.map((recipe) => (
                                <RecipePreview 
                                    key={recipe._id}
                                    data={recipe}
                                    editMode={editMode}
                                    handleRemoveRecipe={handleRemoveRecipe}
                                />
                            ))
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default MyRecipesPage;
