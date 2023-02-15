import React from 'react'
import './sidebar.styles.css'

import {Link} from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="myrecipes">My Recipes</Link>
            <Link to="addrecipe">Add Recipes</Link>
            <Link to="profile">Profile</Link>
            <Link to="settings">Settings</Link>
        </div>
    )
}

export default Sidebar