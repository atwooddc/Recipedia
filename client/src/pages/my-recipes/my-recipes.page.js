import React from 'react'
import './my-recipes.styles.css'

import RecipePreview from '../../components/recipe-preview/recipe-preview.component'

const dummyRecipes = [
    {
        id: 1,
        title: "Asian radish salad",
        img: "https://static01.nyt.com/images/2020/10/07/dining/04HealthyRoundup-Chicken-and-Cabbage/merlin_173165028_672c579b-817d-4be9-9c06-2c5d75334792-videoSixteenByNine3000.jpg"
    },
    {
        id: 2,
        title: "Paella",
        img: "https://www.foodandwine.com/thmb/bVcPTJTtq4HZz5tGS2d3C9m7kOg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-and-chorizo-paella-FT-RECIPE0221-3d6a72481b6a42d1ab64f440aae17b12.jpg"
    },
    {
        id: 3,
        title: "Shrimp tacos",
        img: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/04/Shrimp-Tacos-main-1.jpg"
    },
    {
        id: 4,
        title: "Asian radish salad",
        img: "https://static01.nyt.com/images/2020/10/07/dining/04HealthyRoundup-Chicken-and-Cabbage/merlin_173165028_672c579b-817d-4be9-9c06-2c5d75334792-videoSixteenByNine3000.jpg"
    },
    {
        id: 5,
        title: "Asian radish salad",
        img: "https://static01.nyt.com/images/2020/10/07/dining/04HealthyRoundup-Chicken-and-Cabbage/merlin_173165028_672c579b-817d-4be9-9c06-2c5d75334792-videoSixteenByNine3000.jpg"
    }
]

const MyRecipesPage = () => {
  return (
    <div className='my-recipes-page'>
        <h1>MyRecipesPage</h1>
        <br/>
        <div className="recipes-grid">
            {
                dummyRecipes.map(r => <RecipePreview data={r} />)
            }
        </div>
    </div>
  )
}

export default MyRecipesPage