import React, { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { addBaseUrlClient } from "../../utils/getBaseClientUrl";
import useAuth from "../../hooks/useAuth";

const ManualInsertPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [ingredients, setIngredients] = useState([{ value: "" }]);
    const [steps, setSteps] = useState([{ value: "" }]);

    const handleIngChange = (index, event) => {
        const values = [...ingredients];
        values[index].value = event.target.value;
        setIngredients(values);
    };
    const handleStepChange = (index, event) => {
        const values = [...steps];
        values[index].value = event.target.value;
        setSteps(values);
    };

    const handleAddIng = () => {
        const values = [...ingredients];
        values.push({ value: "" });
        setIngredients(values);
    };
    const handleAddStep = () => {
        const values = [...steps];
        values.push({ value: "" });
        setSteps(values);
    };

    const handleRemoveIng = (index) => {
        const values = [...ingredients];
        values.splice(index, 1);
        setIngredients(values);
    };
    const handleRemoveStep = (index) => {
        const values = [...steps];
        values.splice(index, 1);
        setSteps(values);
    };

    const [tags, setTags] = useState("");
    const [tagsError, setTagsError] = useState("");

    const handleTagsChange = (event) => {
        const value = event.target.value;
        const substrings = value.split(",").map((s) => s.trim());
        if (!substrings.every((s) => /^\S*$/.test(s))) {
            setTagsError(
                "Please use only one-word tags separated by commas. Hyphens are allowed (e.g. 'air-fryer')."
            );
        } else {
            setTagsError("");
        }
        setTags(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (tagsError !== "") {
            return; // stop form submission
        }

        let ing_arr = [];
        for (let ing of ingredients) {
            if (ing.value !== "" && ing.value !== "\n") {
                ing_arr[ing_arr.length] = ing.value;
            }
        }

        let step_arr = [];
        for (let step of steps) {
            if (step.value !== "" && step.value !== "\n") {
                step_arr[step_arr.length] = step.value;
            }
        }

        let tag_arr = tags
            .split(",")
            .map((s) => s.trim())
            .filter((str) => str !== "");

        let json_data = JSON.stringify({
            title: data.get("title"),
            ingredients: ing_arr,
            instructions: step_arr,
            tags: tag_arr,
            imageUrl: data.get("ImageUrl"),
        });

        console.log(json_data);

        // Send data to the backend via POST
        fetch("http://localhost:8080/recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json_data, // body data type must match "Content-Type" header
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((json) => {
                return fetch(addBaseUrlClient(`users/addrecipe/${json._id}`), {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((json) => {
                setAuth(json);
                navigate("../myrecipes");
            })
            .catch((err) => console.error(err));

        // redirect user to recipe they just created
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
            secondary: {
                main: "#9e9e9e",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <h2>Enter recipe information here</h2>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={3}>
                                {/* Header */}
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            {" "}
                                            Title
                                        </Typography>

                                        <Box
                                            sx={{
                                                mb: 1,
                                                flexDirection: "row",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <TextField
                                                name="title"
                                                id="title"
                                                // label="Title"
                                                placeholder="Title"
                                                fullWidth
                                                autoFocus
                                                required
                                                sx={{
                                                    mt: 1,
                                                    marginRight: "10px",
                                                    height: "50px",
                                                }}
                                            />
                                            <Button
                                                type="submit"
                                                // fullWidth
                                                variant="contained"
                                                sx={{
                                                    minWidth: "150px",
                                                    mt: 1,
                                                    height: "50px",
                                                }}
                                            >
                                                Add Recipe
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                                {/* Ingredients */}
                                <Grid item xs={12} md={8} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            {" "}
                                            Ingredients
                                        </Typography>
                                        <Box sx={{ mt: 1 }}>
                                            <Grid fullWidth item xs={12}>
                                                {ingredients.map(
                                                    (field, index) => (
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                            key={index}
                                                        >
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                sx={{
                                                                    padding: 0.75,
                                                                }}
                                                                required={
                                                                    index === 0
                                                                }
                                                                placeholder={
                                                                    index === 0
                                                                        ? "Ingredient 1 (ex: 3 eggs)"
                                                                        : index ===
                                                                          1
                                                                        ? "Ingredient 2 (ex: 2/3 cup flour)"
                                                                        : index ===
                                                                          2
                                                                        ? "Ingredient 3 (ex: 2 tbsp olive oil)"
                                                                        : `Ingredient ${
                                                                              index +
                                                                              1
                                                                          }`
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleIngChange(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                                InputProps={
                                                                    index >
                                                                        0 && {
                                                                        endAdornment:
                                                                            (
                                                                                <InputAdornment position="end">
                                                                                    <IconButton
                                                                                        color="secondary"
                                                                                        onClick={() =>
                                                                                            handleRemoveIng(
                                                                                                index
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <ClearIcon />
                                                                                    </IconButton>
                                                                                </InputAdornment>
                                                                            ),
                                                                    }
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                )}
                                                <Box
                                                    mr={1}
                                                    //margin
                                                    display="flex"
                                                    justifyContent="flex-end"
                                                    alignItems="flex-end"
                                                >
                                                    <IconButton
                                                        color="primary"
                                                        onClick={handleAddIng}
                                                    >
                                                        <AddCircleIcon
                                                            sx={{
                                                                fontSize:
                                                                    "200%",
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Grid>
                                {/* Steps */}
                                <Grid item xs={12} md={8} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            {" "}
                                            Steps{" "}
                                        </Typography>
                                        <Box sx={{ mt: 1 }}>
                                            <Grid item xs={12}>
                                                {steps.map((field, index) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                        key={index}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            multiline
                                                            size="small"
                                                            sx={{
                                                                padding: 0.75,
                                                            }}
                                                            required={
                                                                index === 0
                                                            }
                                                            placeholder={`Step ${
                                                                index + 1
                                                            }`}
                                                            value={field.value}
                                                            onChange={(event) =>
                                                                handleStepChange(
                                                                    index,
                                                                    event
                                                                )
                                                            }
                                                            InputProps={
                                                                index > 0 && {
                                                                    endAdornment:
                                                                        (
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    color="secondary"
                                                                                    onClick={() =>
                                                                                        handleRemoveStep(
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <ClearIcon />
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        ),
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                                <Box
                                                    mr={1}
                                                    //margin
                                                    display="flex"
                                                    justifyContent="flex-end"
                                                    alignItems="flex-end"
                                                >
                                                    <IconButton
                                                        color="primary"
                                                        onClick={handleAddStep}
                                                    >
                                                        <AddCircleIcon
                                                            sx={{
                                                                fontSize:
                                                                    "200%",
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Grid>

                                {/* Cook time, Prep time, Nutrition */}

                                {/* const NutritionSchema = new Schema({
                                    servings: String,
                                    calories: String,
                                    fat: String,
                                    carbs: String,
                                    protein: String
                                }, { _id: false }); */}

                                {/* prepTime: Number,
                                cookTime: Number,
                                totalTime: Number,
                                nutrition: {
                                    type: [NutritionSchema],
                                    default: null,
                                    required: false
                                }, */}

                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                        fullWidth
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            {" "}
                                            Nutrition
                                        </Typography>
                                        <TextField
                                            name="tags"
                                            id="tags"
                                            // label="Tags"
                                            placeholder="Nutrition"
                                            // fullWidth
                                            sx={{ mt: 1, marginRight: "10px" }}
                                        />
                                    </Paper>
                                </Grid>

                                {/* Tags */}
                                <Grid item xs={12} md={8} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            {" "}
                                            Tags
                                        </Typography>
                                        <TextField
                                            name="tags"
                                            id="tags"
                                            // label="Tags"
                                            placeholder="Tags"
                                            // fullWidth
                                            value={tags}
                                            onChange={handleTagsChange}
                                            error={!!tagsError}
                                            helperText={
                                                tagsError !== ""
                                                    ? tagsError
                                                    : 'Add keywords to categorize your recipe! Ex: "thai, peanuts, air-fryer,..."'
                                            }
                                            sx={{ mt: 1, marginRight: "10px" }}
                                        />
                                    </Paper>
                                </Grid>
                                {/* Image URL */}
                                <Grid item xs={12} md={8} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            {" "}
                                            Image URL
                                        </Typography>
                                        <TextField
                                            name="ImageUrl"
                                            id="ImageUrl"
                                            placeholder="Image URL"
                                            helperText="Add an image to accompany your recipe"
                                            // fullWidth
                                            sx={{
                                                mt: 1,
                                                marginRight: "10px",
                                            }}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
export default ManualInsertPage;
