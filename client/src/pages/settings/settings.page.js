import React from "react";
import "./settings.styles.css";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

const SettingsPage = () => {
    const scrollOffset = -1 * window.innerHeight * 0.1;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    var time = new Date().getHours();
    var greeting =
        "Good " + (time < 12 ? "morning" : time < 18 ? "afternoon" : "evening");

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
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Header */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Avatar
                                        alt="Grant Achatz"
                                        src="/grant.jpg"
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <Box
                                        sx={{
                                            p: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            {greeting}, Grant
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="#909090"
                                        >
                                            Member since 2023
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* The Basics */}
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
                                        The Basics
                                    </Typography>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleSubmit}
                                        sx={{ mt: 3 }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="firstName"
                                                    fullWidth
                                                    id="firstName"
                                                    label="First Name"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    id="lastName"
                                                    label="Last Name"
                                                    name="lastName"
                                                    autoComplete="family-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box
                                            m={1}
                                            //margin
                                            display="flex"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* Reset Password */}
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
                                        Reset Password{" "}
                                    </Typography>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleSubmit}
                                        sx={{ mt: 3 }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="old-password"
                                                    label="Old Password"
                                                    type="password"
                                                    id="old-password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="new-password"
                                                    label="New Password (6 characters)"
                                                    type="password"
                                                    id="new-password"
                                                    autoComplete="new-password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="confirm-password"
                                                    label="Confirm Password"
                                                    type="password"
                                                    id="confirm-password"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box
                                            m={1}
                                            //margin
                                            display="flex"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* Advanced */}
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
                                        Advanced{" "}
                                    </Typography>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleSubmit}
                                        sx={{ mt: 3 }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="location"
                                                    label="Location"
                                                    type="location"
                                                    id="location"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="birthday"
                                                    label="Birthday"
                                                    type="birthday"
                                                    id="birthday"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="phone-number"
                                                    label="Phone Number"
                                                    type="phone-number"
                                                    id="phone-nunmber"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box
                                            m={1}
                                            //margin
                                            display="flex"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            {/* Account*/}
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
                                        Account{" "}
                                    </Typography>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle2"
                                                color="common.black"
                                                fontWeight="bold"
                                            >
                                                {" "}
                                                Reset Account{" "}
                                            </Typography>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="common.black"
                                                >
                                                    {" "}
                                                    Delete all current recipes,
                                                    posts, and viewing history
                                                    while maintaining account{" "}
                                                </Typography>
                                            </Box>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-end"
                                                alignItems="flex-end"
                                            >
                                                <Button
                                                    type="submit"
                                                    variant="outlined"
                                                    sx={{ mt: 3, mb: 2 }}
                                                >
                                                    Reset Account
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle2"
                                                color="common.black"
                                                fontWeight="bold"
                                            >
                                                {" "}
                                                Delete Account{" "}
                                            </Typography>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="common.black"
                                                >
                                                    {" "}
                                                    Deletes all history, removes
                                                    email and account records
                                                    from our application{" "}
                                                </Typography>
                                            </Box>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-end"
                                                alignItems="flex-end"
                                            >
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="error"
                                                    sx={{ mt: 3, mb: 2 }}
                                                >
                                                    Delete Account
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default SettingsPage;
