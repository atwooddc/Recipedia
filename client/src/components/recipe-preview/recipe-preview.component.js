import React from 'react'
import './recipe-preview.styles.css'

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {useNavigate} from 'react-router-dom'

const RecipePreview = ({data}) => {
    const {id, title, img, desc} = data
    const navigate = useNavigate()

    return (
        <Grid item key={id} xs={12} sm={6} md={4}>
            <Card
                sx={{
                    height: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer"
                }}
                onClick={() => navigate(`../recipe/${id}`)}
            >
                <CardMedia
                    component="img"
                    image={img}
                    alt="recipe"
                    style={{height: "60%"}}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Typography>{desc}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
    
export default RecipePreview