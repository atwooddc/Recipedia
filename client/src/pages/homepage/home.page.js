import React from "react";
import "./home.styles.css";
import Logo from "../../components/logo/logo.component";
import CookingVideo from "../../assets/bellpepper.mp4";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";
import { Card } from "@mui/material";

const HomePage = () => {
    const scrollOffset = -1 * window.innerHeight * 0.1;

    return (
        <div className="homepage">
            <div className="page" id="home" style={{ position: "relative" }}>
                <div className="logo-cont">
                    <Logo home />
                </div>
                <video id="VideoTag" autoPlay loop muted>
                    <source src={CookingVideo} type="video/mp4" />
                </video>
                <h2 style={{ color: "white" }}>
                    Join the fastest growing hub to upload, organize, and share
                    your recipes{" "}
                </h2>
                <div className="btn-grp">
                    <Link to="login">
                        <button id="secondary_btn">Sign In </button>
                    </Link>
                    <Link to="register">
                        <button id="main_btn">Register Now!</button>
                    </Link>
                </div>

                <br />
            </div>
            <div className="features">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: "bold" }}
                                    component="div"
                                >
                                    Upload Recipes Online or Manually{" "}
                                </Typography>

                                <Typography variant="body2">
                                    Use our patented Recipe Parser to
                                    automatically scrape information from your
                                    favorite websites or transcribe grandmothers
                                    hand-written notecards from the motherland
                                </Typography>
                            </CardContent>
                        </Card>{" "}
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}></Grid>

                    <Grid item xs={6} alignItems={"right"}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: "bold" }}
                                    component="div"
                                >
                                    Organize and Get Smart Suggestions{" "}
                                </Typography>

                                <Typography variant="body2">
                                    Have all of your week-night meals in a
                                    single spot and we’ll provide similar
                                    recipes using Machine Learning from other
                                    users{" "}
                                </Typography>
                            </CardContent>
                        </Card>{" "}
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: "bold" }}
                                    component="div"
                                >
                                    Share Your Favorites With Friends{" "}
                                </Typography>

                                <Typography variant="body2">
                                    Post, Comment, and Re-post recipes with our
                                    Social Feed to see what your friends are
                                    cooking and put them onto your favroites!
                                </Typography>
                            </CardContent>
                        </Card>{" "}
                    </Grid>
                </Grid>
            </div>

            <button id="final_btn">Register Now!</button>
        </div>
    );
};

export default HomePage;
