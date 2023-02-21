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

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getBaseUrlClient } from "../../utils/getBaseClientUrl";

const Login = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const scrollOffset = -1 * window.innerHeight * 0.1;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });

        //temporary, login whenever button is clicked
        setAuth(true);
        navigate("../home");
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor: "#4c8bf5",
                                    marginTop: 0,
                                }}
                                onClick={() =>
                                    (window.location.href = `${getBaseUrlClient()}/auth/google`)
                                }
                            >
                                Sign In With Google
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <RouterLink to="#">
                                        <Link variant="body2">
                                            Forgot password?
                                        </Link>
                                    </RouterLink>
                                </Grid>
                                <Grid item>
                                    <RouterLink to="../register">
                                        <Link variant="body2">
                                            Don't have an account? Sign Up
                                        </Link>
                                    </RouterLink>
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
