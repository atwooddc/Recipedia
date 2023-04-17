import React from "react";
import "./recipe-preview.styles.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

// const defaultImageUrl = "https://static.vecteezy.com/system/resources/previews/002/621/029/original/chef-recipe-book-kitchen-utensil-line-style-icon-free-vector.jpg"
const defaultImageUrl =
    "https://media.istockphoto.com/id/1038343992/vector/black-silhouette-of-crossed-fork-and-knife-icon-vector-isolated.jpg?s=612x612&w=0&k=20&c=VBYHxRC7x2sQwG0y_sPa3Yiz7ORs0uaj1WQEOqDdpy8=";

const RecipePreview = ({ data }) => {
    const { _id, title, imageUrl } = data;
    const navigate = useNavigate();

    return (
        <Grid item key={_id} xs={12} sm={6} md={4}>
            <Card
                sx={{
                    width: "35vh",
                    height: "40vh",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    "&:hover": {
                        background: "var(--coral)",
                        transform: "scale(1.02)",
                        transition: "0.1s ease-in",
                    },
                }}
                onClick={() => navigate(`../recipe/${_id}`)}
            >
                <CardMedia
                    component="img"
                    image={imageUrl ? imageUrl : defaultImageUrl}
                    alt="recipe"
                    style={{ height: "70%" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        noWrap
                        gutterBottom
                        variant="h5"
                        component="h2"
                        sx={{
                            fontSize: "100%",
                            color: "var(--dark-gray)",
                        }}
                        // className='text-cont'
                    >
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default RecipePreview;
