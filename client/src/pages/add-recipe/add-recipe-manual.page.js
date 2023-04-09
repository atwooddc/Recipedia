import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link as RouterLink } from "react-router-dom";

const ManualInsertPage = () => {
    const navigate = useNavigate();
    const scrollOffset = -1 * window.innerHeight * 0.1;

    // CHATGPT --->
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

    // <--- CHATGPT 

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        console.log(ingredients);
        console.log(steps);
        
        // need to handle ingredients, steps
        let ing_string = ""
        for (let ing of ingredients) {
            if (ing.value !== '' && ing.value !== '\n') {
                ing_string = ing_string + ing.value + "\n";
            }
        }

        let step_string = ""
        for (let step of steps) {
            if (step.value !== '' && step.value !== '\n') {
                step_string = step_string + step.value + "\n";
            }
        }

        let json_data = JSON.stringify({
            title: data.get("title"),
            ingredients: ing_string,
            steps: step_string,
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
                main: "#F26969"
            },
            secondary: {
                main: "#9e9e9e"
            }
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
                                <Grid fullWidth item xs={12}>
                                    {ingredients.map((field, index) => (
                                        <div style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder={
                                                index === 0 ? 'Ingredient 1 (ex: 3 eggs)' : 
                                                index === 1 ? 'Ingredient 2 (ex: 2/3 cup flour)' : 
                                                index === 2 ? 'Ingredient 3 (ex: 2 tbsp olive oil)' : 
                                                `Ingredient ${index + 1}`}
                                            value={field.value}
                                            onChange={(event) => handleIngChange(index, event)}
                                            InputProps={ 
                                                index > 0 && 
                                                {
                                                endAdornment: (
                                                  <InputAdornment position="end">
                                                    <IconButton
                                                    color="secondary"
                                                    onClick={() => handleRemoveIng(index)}>
                                                      <DeleteIcon />
                                                    </IconButton>
                                                  </InputAdornment>
                                                ),
                                              }}
                                        />
                                        </div>
                                    ))}
                                    <Button fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            color="primary" 
                                            onClick={handleAddIng}
                                            startIcon={<AddCircleIcon />}>
                                        Ingredient
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    {steps.map((field, index) => (
                                        <div style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                                        <TextField
                                            fullWidth
                                            // multiline
                                            size="small"
                                            placeholder={`Step ${index + 1}`}
                                            value={field.value}
                                            onChange={(event) => handleStepChange(index, event)}
                                            InputProps={ 
                                                index > 0 && 
                                                {
                                                endAdornment: (
                                                  <InputAdornment position="end">
                                                    <IconButton
                                                    color="secondary"
                                                    onClick={() => handleRemoveStep(index)}>
                                                      <DeleteIcon />
                                                    </IconButton>
                                                  </InputAdornment>
                                                ),
                                              }}
                                        />
                                        </div>
                                    ))}
                                    <Button fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }} 
                                            color="primary" 
                                            onClick={handleAddStep}
                                            startIcon={<AddCircleIcon />}>
                                        Step
                                    </Button>
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
