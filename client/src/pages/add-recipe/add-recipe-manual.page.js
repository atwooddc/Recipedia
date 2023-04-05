import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link as RouterLink } from "react-router-dom";

const ManualInsertPage = () => {
    const navigate = useNavigate();
    const scrollOffset = -1 * window.innerHeight * 0.1;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let json_data = JSON.stringify({
            title: data.get("title"),
            ingredients: data.get("ingredients"),
            steps: data.get("steps"),
            tags: data.get("tags"),
        });
        console.log(json_data);

        // Send data to the backend via POST
        fetch("http://localhost:8080/recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json_data, // body data type must match "Content-Type" header
        }).then((res) => res.json());
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    return (
        <div>
            <h2>Enter recipe information here</h2>
            <ThemeProvider theme={theme}>
                <Container component="main">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="title"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="ingredients"
                                        label="Ingredients"
                                        name="ingredients"
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="steps"
                                        label="Steps"
                                        name="steps"
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="tags"
                                        label="Tags"
                                        name="tags"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Recipe
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};
export default ManualInsertPage;
