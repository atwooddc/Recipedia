import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import "./add-recipe.styles.css";


const AddRecipePage = () => (
    <div>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            minHeight="100vh"
            padding="5vh"
        >
            <h1>Add a Recipe</h1>
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap="5vw"
                style={{marginTop: "5vh"}}
            >
                <LinkCard 
                    title="Automatically Parse" 
                    description="Input a link to your favorite recipes"
                    image="https://i0.wp.com/mbrjournal.com/wp-content/uploads/2022/08/MBR-Paper-18-Kumar_1771088840.png?fit=2560%2C1440&ssl=1"
                    link="autoparse"
                />
                <LinkCard 
                    title="Manually Input" 
                    description="Add your recipe using our recipe builder tool"
                    image="https://d3m7xw68ay40x8.cloudfront.net/assets/2016/04/15091737/kitchen-riches-sheri-castle.jpg"
                    link="manualinsert"
                />
            </Grid>
        </Box>
    </div>
)
export default AddRecipePage;


const LinkCard = ({title, description, image, link}) => {
    const navigate = useNavigate();

    return(
        <Card
            onClick={() => navigate(link)}
        >
            <CardActionArea sx={{ width: "25vw", height: "20vw"}}>
                <CardMedia
                    component="img"
                    height="60%"
                    image={image}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}