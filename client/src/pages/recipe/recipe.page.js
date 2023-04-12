import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomTextArea from '../../components/custom-textarea/custom-textarea.component';
import { AccessTime, Favorite, Kitchen } from '@mui/icons-material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Box from "@mui/material/Box";

import './recipe.styles.css';

const dummyRecipeData = {
  title: 'Eggplant Parmesean',
  img: 'https://static.onecms.io/wp-content/uploads/sites/44/2021/02/08/grilled-eggplant-parmesan-2000.jpg',
  servingSize: '2 people',
  ingredients: [
    '2 large eggplants',
    '1 jar of tomato sauce',
    'Mozzerella cheese slices',
    '1lb of spicy sausage',
    'One medium yellow onion',
  ],
  steps: [
    'Preheat your oven to 400',
    'Carve out the flesh of the eggplants and dice the flesh along with your yellow onion',
    'Heat a pan to medium heat and coat it with cooking spray and cook down your vegetables',
    'Heat a separate pan to medium heat and cook your sausage. Once cooked, crush into small pieces.',
    'After the vegetables are cooked down, add in the sausage and the jar of tomato sauce and reduce to a simmer. Let that sit for at least 20 minutes.',
    'Once the over is preheated, place the eggplant skins in on a baking sheet. Bake for 10 minutes',
    'Fill each of the skins with the sauce mixture and layer mozzerella cheese on top. Place back in the oven on broil until browned.',
  ],
  notes: '',
};

const RecipePage = () => {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState(dummyRecipeData);
  const [editMode, setEditMode] = useState(false);

  // This is where we make a call to the API to pull in data for the specific recipe
  // NOTE: For now, I will use dummy data and we will replace that later
  useEffect(() => {}, []);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
return (
  <div className="recipe-page">
    <div className="recipe-info" mt={10}>
      <div className="recipe-header">
        <h1>{recipe?.title}</h1>
      </div>
      <div className="recipe-details-container">
        <div className="recipe-ingredients-container">
          <div className="recipe-img-container">
            <img src={recipe?.img} alt={recipe?.title} />
          </div>
          <div className="recipe-details">
            <p>{`Serving size: ${recipe?.servingSize}`}</p>
            <h3>Ingredients <Kitchen /> </h3>
            <ul>
              {recipe?.ingredients.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="recipe-steps">
          <h3>Steps <ListAltIcon /></h3>
          <ol>
            {recipe?.steps.map((step) => (
              <li>{step}</li>
            ))}
          </ol>
          <CustomTextArea
            label="Notes"
            type="text"
            name="notes"
            value={recipe?.notes}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
      </div>
      <button
        className="button"
        onClick={() => setEditMode(!editMode)}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}>
        {`${editMode ? "Save" : "Edit"}`}
      </button>
    </div>
  </div>
);

};

export default RecipePage;
