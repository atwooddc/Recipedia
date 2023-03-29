import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const AutoParsePage = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item m>
                    <Card
                        sx={{ maxWidth: 345 }}
                        onClick={() => navigate(`./autoparse`)}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://i0.wp.com/mbrjournal.com/wp-content/uploads/2022/08/MBR-Paper-18-Kumar_1771088840.png?fit=2560%2C1440&ssl=1"
                                alt="world wide web"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    OOGA BOOGA{" "}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Include a link to your favorite online
                                    recipe and we’ll extract the recipe
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>{" "}
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://d3m7xw68ay40x8.cloudfront.net/assets/2016/04/15091737/kitchen-riches-sheri-castle.jpg"
                                alt="recipe box"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    Manual Input
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Input the steps to homemade recipes and
                                    they’ll be in your recipe box
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>{" "}
                </Grid>
            </Grid>
        </Box>
    );
};
export default AutoParsePage;
