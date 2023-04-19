
import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const defaultImageUrl =
  'https://static.vecteezy.com/system/resources/previews/002/621/029/original/chef-recipe-book-kitchen-utensil-line-style-icon-free-vector.jpg';

const Carousel = ({ recipes }) => {
  const navigate = useNavigate();

  const numRecipes = recipes?.length;
  const showSlides = numRecipes >= 4 ? 4 : numRecipes;
  const scrollSlides = numRecipes >= 4 ? 4 : numRecipes;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: showSlides,
    slidesToScroll: scrollSlides,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} >
      {recipes.map(({ _id, title, imageUrl }) => (
          <Card
            style={{ margin: '0 10px'}}
            onClick={() => navigate(`../recipe/${_id}`)}
          >
            <CardMedia
              component="img"
              height="140"
              image={imageUrl ? imageUrl : defaultImageUrl}
              alt="recipe"
            />
            <CardContent>
              <Typography noWrap gutterBottom variant="h5" component="div" align="center">
                {title}
              </Typography>
            </CardContent>
          </Card>
      ))}
    </Slider>
  );
};

export default Carousel;
