import React from 'react'
import './logo.styles.css'

import Icon from '../../assets/hat.png'
import { useNavigate } from 'react-router-dom'

// This logo component has been enhanced so that you can pass in a prop that will reroute you to a specific location if you click it. This prop is optional, if it is not passed in, the logo is not clickable.

const Logo = ({linkTo, home}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if(linkTo){
            navigate(linkTo)
        }
    }

    return (
        <div className={`logo ${linkTo ? "link" : ""} ${home ? "home" : ""}`} onClick={handleClick}>
            <img src={Icon} alt="Logo"/>
            <h1>Recipedia</h1>
        </div>
    )
}

export default Logo