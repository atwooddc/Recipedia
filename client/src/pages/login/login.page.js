import React from "react";
import "./login.styles.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Logo from "../../components/logo/logo.component";

import useAuth from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { addBaseUrlClient } from "../../utils/getBaseClientUrl";

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        //ENCRPYT it with passport and chatgpt
        let json_data = JSON.stringify({
            email: data.get("email"),
            password: data.get("password"),
        });

        try {
            // Send data to the backend via POST
            await fetch(addBaseUrlClient("auth/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: json_data, // body data type must match "Content-Type" header
            })
                .then((response) => response.json())
                .then((data) => {
                    const token = data.token;
                    document.cookie = `token=${token}; path=/;`;

                    const user = data.user;
                    setAuth(user);
                    // redirect to protected route
                    navigate("../home");
                })
                .catch((error) => console.error(error));
        } catch (err) {
            console.error(err);
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    return (
        <div className="login-page">
            {/* {`You are logged ${auth ? "In" : "Out"}`} */}
            <div className="logo-cont">
                <Logo linkTo=".." />
            </div>
            <h2>Welcome back, Chef</h2>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
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
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="flex-end">
                                {/* <Grid item xs>
                                    <Link variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link
                                        variant="body2"
                                        onClick={() => navigate("../register")}
                                    >
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default Login;
