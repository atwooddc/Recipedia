import {React, useState} from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import LinkIcon from '@mui/icons-material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

const AutoParsePage = () => {
    const navigate = useNavigate();
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
      });

    // Greys out button until text field is filled
    const [link, setLink] = useState('');
    const [error, setError] = useState(null);
  
    const handleTextChange = (event) => {
        setLink(event.target.value);
    };
  
    const isTextFilled = text !== '';

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let json_data = JSON.stringify({
            link: data.get("link"),
        });
        console.log(json_data);
        // Then we will send the link to parser

        // redirect to recipe card on success OR
        // redirect back to input page with error message

    };
    
      return (
        <div>
        <h2>Enter the link to your recipe here</h2>
            <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3, width: "80%", justifyContent: "center"}}
                    >
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField
                                    name="link"
                                    required
                                    fullWidth
                                    id="link"
                                    autoFocus
                                    onChange={handleTextChange}
                                    placeholder="www.myrecipe.com" 
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            < LinkIcon/>
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isTextFilled} 
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    </div>
    )
};
export default AutoParsePage;
