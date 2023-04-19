import React, { useState } from "react";
import "./my-recipes.styles.css";

import RecipePreview from "../../components/recipe-preview/recipe-preview.component";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import useAuth from "../../hooks/useAuth";

import { addBaseUrlClient } from "../../utils/getBaseClientUrl";

const MyRecipesPage = () => {
    const [editMode, setEditMode] = useState(false);
    const { auth, setAuth } = useAuth();
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    const handleRemoveRecipe = (recipeId) => {
        fetch(addBaseUrlClient(`users/recipe/${recipeId}`), {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((json) => setAuth(json))
            .catch((err) => console.error(err));
    };

    return (
        <div className="my-recipes-page">
            <h2>Hope you're hungry!</h2>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            mb: 1,
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "md",
                        }}
                    >
                        <TextField
                            name="query"
                            id="query"
                            label="Search"
                            placeholder="Search your recipes!"
                            // fullWidth
                            autoFocus
                            sx={{
                                mt: 1,
                                marginRight: "10px",
                                height: "50px",
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => setEditMode(!editMode)}
                            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
                            sx={{ minWidth: "100px", mt: 1, height: "50px" }}
                        >
                            {editMode ? "Save" : "Edit"}
                        </Button>
                    </Box>
                    <Container
                        sx={{ py: 8 }}
                        maxWidth="md"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Grid container spacing={4}>
                            {auth.recipes?.map((recipe) => (
                                <RecipePreview
                                    key={recipe._id}
                                    data={recipe}
                                    editMode={editMode}
                                    handleRemoveRecipe={handleRemoveRecipe}
                                />
                            ))}
                        </Grid>
                    </Container>
                </ThemeProvider>
            </Container>
        </div>
    );
};

export default MyRecipesPage;
