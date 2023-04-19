import React, { useState, useEffect } from "react";
import "./my-recipes.styles.css";

import RecipePreview from "../../components/recipe-preview/recipe-preview.component";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

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

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(auth.recipes);

    useEffect(() => {
        setSearchResults(
            auth.recipes.filter((recipe) =>
                recipe.title.toLowerCase().includes(searchTerm)
            )
        );
    }, [auth.recipes]);

    const handleSearchTerm = (event) => {
        const query = event.target.value.toLowerCase();

        setSearchResults(
            auth.recipes.filter((recipe) =>
                recipe.title.toLowerCase().includes(query)
            )
        );
    };

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
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "100%",
                    }}
                >
                    <CssBaseline />
                    <h2>Hope you're hungry!</h2>
                    <Container
                        maxWidth="lg"
                        sx={{ mt: 4, mb: 4, flexDirection: "column" }}
                    >
                        <Box
                            sx={{
                                mb: 1,
                                px: 4,
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                maxWidth: "md",
                            }}
                        >
                            <TextField
                                name="searchterm"
                                id="searchterm"
                                label="Search"
                                fullWidth
                                autoFocus
                                sx={{
                                    mt: 1,
                                    marginRight: "100px",
                                    height: "50px",
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                onKeyUp={handleSearchTerm}
                            />
                            <Button
                                variant="contained"
                                onClick={() => setEditMode(!editMode)}
                                startIcon={
                                    editMode ? <SaveIcon /> : <EditIcon />
                                }
                                sx={{
                                    minWidth: "100px",
                                    mt: 1,
                                    mr: "10px",
                                    height: "50px",
                                }}
                            >
                                {editMode ? "Save" : "Edit"}
                            </Button>
                        </Box>
                        <Container
                            sx={{ py: 6 }}
                            maxWidth="md"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                container
                                spacing={4}
                                // style={{ backgroundColor: "lightblue" }}
                            >
                                {!searchResults.length ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            minWidth: "90%",
                                        }}
                                    >
                                        {!auth.recipes.length ? (
                                            <h2>
                                                Your Recipedia is empty. Get
                                                started at "Add Recipes".
                                            </h2>
                                        ) : (
                                            <h2>Hmm...can't find anything</h2>
                                        )}
                                    </Box>
                                ) : (
                                    searchResults.map((recipe) => (
                                        <RecipePreview
                                            key={recipe._id}
                                            data={recipe}
                                            editMode={editMode}
                                            handleRemoveRecipe={
                                                handleRemoveRecipe
                                            }
                                        />
                                    ))
                                )}
                            </Grid>
                        </Container>
                    </Container>
                </Box>
            </ThemeProvider>
        </div>
    );
};

export default MyRecipesPage;
