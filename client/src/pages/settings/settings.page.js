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
                                        height: 240,
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
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={8} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 240,
                                    }}
                                ></Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default SettingsPage;
