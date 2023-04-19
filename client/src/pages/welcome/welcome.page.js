import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import './welcome.styles.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from '../../components/carousel/carousel.component';
import useAuth from "../../hooks/useAuth";
import {getBaseUrlClient} from '../../utils/getBaseClientUrl'


import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const WelcomePage = () => {
  const { auth } = useAuth();
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await fetch(`${getBaseUrlClient("recipe")}?limit=10`);
      const json = await response.json();
      setSuggestedRecipes(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="welcome-box">
        <Typography variant="h4" component="h1" align="center" color="white">
          Welcome! Let's Get Cooking
        </Typography>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} mt={0}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" mt={5}>
              <Link className="link1" to="/myrecipes">
                My Recipes
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Carousel recipes={auth.recipes} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" mt={5} color="black">
              Try These Recipes!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Carousel recipes={suggestedRecipes.slice(0,10)} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} mt={5}>
        <Grid item xs={12} md={12}>
          <Box className="bottom-box" p={3}>
            <Typography variant="h5" component="h2">
              <Link className="link2" to="/addrecipe">
                Add Recipes
              </Link>
            </Typography>
            <Typography variant="body1" component="p" align="center">
              Ready to create a masterpiece? Add your recipe here.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default WelcomePage;
