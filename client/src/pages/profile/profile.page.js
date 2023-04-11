import React from "react";
import "./profile.styles.css";

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
import useAuth from "../../hooks/useAuth";
import bcrypt from "bcryptjs";
import TwitterTimeline from "./TwitterTimeline.js";

const ProfilePage = () => {
    const { auth, setAuth } = useAuth();

    const scrollOffset = -1 * window.innerHeight * 0.1;
    const handle = auth.twitterHandle;

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
                    <div
                        className="page"
                        id="home"
                        style={{ position: "relative" }}
                    >
                        <img
                            id="PicTag"
                            src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422.jpg"
                        />
                        <Container
                            maxWidth="lg"
                            sx={{ mt: 4, mb: 4 }}
                            style={{ zIndex: 1251, padding: 100 }}
                        >
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
                                            alt={auth.firstName}
                                            src={auth.imgUrl}
                                            sx={{ width: 200, height: 200 }}
                                        />
                                        <Box
                                            sx={{
                                                p: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                variant="h3"
                                                color="common.black"
                                                fontWeight="bold"
                                            >
                                                {auth.firstName} {auth.lastName}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                color="#909090"
                                                sx={{ paddingLeft: 1 }}
                                            >
                                                @{auth.username}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                color="#909090"
                                                sx={{ paddingLeft: 1 }}
                                            >
                                                {auth.bio}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
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
                                            Email
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                        >
                                            {" "}
                                            {auth.email}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            Birthday
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                        >
                                            {" "}
                                            {auth.birthday}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            Location
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                        >
                                            {" "}
                                            {auth.location}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            Phone
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                        >
                                            {" "}
                                            {auth.phoneNumber}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                            fontWeight="bold"
                                        >
                                            Twitter
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="common.black"
                                        >
                                            {" "}
                                            {auth.twitterHandle}
                                        </Typography>
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
                                        <TwitterTimeline />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>{" "}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default ProfilePage;
