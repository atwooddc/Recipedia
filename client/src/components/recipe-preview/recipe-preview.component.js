import React from 'react'
import './recipe-preview.styles.css'

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import {useNavigate} from 'react-router-dom'

const defaultImageUrl = "https://static.vecteezy.com/system/resources/previews/002/621/029/original/chef-recipe-book-kitchen-utensil-line-style-icon-free-vector.jpg"

const RecipePreview = ({data, editMode, handleRemoveRecipe}) => {
    const {_id, title, imageUrl} = data
    const navigate = useNavigate()

    return (
        <Grid item key={_id} xs={12} sm={6} md={4}>
            <Card
                sx={{
                    width: "35vh",
                    height: "40vh",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "visible"
                }}
                onClick={() => !editMode ? navigate(`../recipe/${_id}`) : null}
            >
                {
                    editMode ?
                    <IconButton
                        onClick={() => handleRemoveRecipe(_id)}
                        style={{
                            position: "absolute",
                            right: "-1vw",
                            top: "-1vw",
                            backgroundColor: "coral"
                        }}
                    >
                        <DeleteIcon/>
                    </IconButton> : null
                }
                <CardMedia
                    component="img"
                    image={imageUrl ? imageUrl : defaultImageUrl}
                    alt="recipe"
                    style={{height: "70%"}}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{fontSize: "100%"}}
                        // className='text-cont'
                    >
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
    
export default RecipePreview