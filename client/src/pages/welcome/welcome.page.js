
import React from 'react';
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



const MyRecipes = [
  {
    id: 1,
    name: 'Sicilian Spaghetti',
    image: 'https://images.unsplash.com/photo-1673442635965-34f1b36d8944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'A timeless Italian pasta dish, cooked to al dente perfection'
  },
  {
    id: 2,
    name: 'Classic Cheeseburger',
    image: 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2295&q=80',
    description: 'A delicious combo of Angus beef, melted swiss cheese, and crisp lettuce'
  },
  {
    id: 3,
    name: 'Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    description: 'Satisfy your sweet tooth with these homemade chocolate chip cookies.'
  },
  {
    id: 4,
    name: 'Chicken Enchiladas',
    image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=802&q=80',
    description: 'These tangy and flavorful enchiladas are sure to be a hit.'
  },
  {
    id: 5,
    name: 'Caprese Salad',
    image: 'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Flc2FyJTIwcmVjaXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    description: 'A simple Italian dish made of mozzarella cheese, juicy tomatoes, and fresh basil'
  }
];

const SuggestedRecipes = [
  {
    id: 6,
    name: 'Caesar Salad',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    description: 'Perfect for any occasion, whether it\'s a quick lunch or a fancy dinner party.'
  },
  {
    id: 7,
    name: 'Grilled Salmon',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'A healthy and delicious fish dish with lemon and herbs.'
  },
  {
    id: 8,
    name: 'Chipotle Beef Tacos',
    image: 'https://images.unsplash.com/photo-1514843319620-4f042827c481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'Savory ground beef combined with traditional Mexican spices'
  },
  {
    id: 9,
    name: 'Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1609770424775-39ec362f2d94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaHJvb20lMjByaXNvdHRvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    description: 'A creamy and comforting rice dish with mushrooms and Parmesan cheese.'
  },
  {
    id: 10,
    name: 'Beef Wellington',
    image: 'https://images.unsplash.com/photo-1546964053-d018e345e490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    description: 'Tender filet wrapped in pastry crust and coated with a savory mushroom duxelles.'
  },
  {
    id: 11,
    name: 'Lemon Meringue',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    description: 'A tangy and sweet dessert pie made with lemon curd filling and fluffy meringue.'
  }
];

const WelcomePage = () => {
return (
  <div>
    <div className="welcome-box">
      <Typography variant="h4" component="h1" align="center">
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
        <Carousel recipes={MyRecipes} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" mt={5} color="black">
          Suggested Recipes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Carousel recipes={SuggestedRecipes} />
      </Grid>
    </Grid>
  </Box>
  <Grid container spacing={2} mt={5}>
    <Grid item xs={12} md={6}>
      <Box className="bottom-box" p={3}>
        <Typography variant="h5" component="h2">
          <Link className="link2" to="/addrecipe">
            Add Recipes
          </Link>
        </Typography>
        <Typography variant="body1" component="p">
          Ready to create a masterpiece? Add your recipe here.
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <Box className="bottom-box" p={3}>
        <Typography variant="h5" component="h2" color="white">
          Ingredient Hub
          </Typography>
          <Typography variant="body1" component="p">
            Cooking on a whim? Let us help you make magic with what you have.
          </Typography>
      </Box>
    </Grid>
  </Grid>
</div>
);
};

export default WelcomePage;
