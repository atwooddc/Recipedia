import React from 'react'
import './recipe-preview.styles.css'

import {useNavigate} from 'react-router-dom'

const RecipePreview = ({data}) => {
    const {id, title, img} = data
    const navigate = useNavigate()

    return (
        <div className="recipe-preview" onClick={() => navigate(`../recipe/${id}`)}>
            <div className="img-cont">
                <img src={img} />
            </div>
            <div className="text-cont">
                <p>{title}</p>
            </div>
        </div>
    )
}

export default RecipePreview