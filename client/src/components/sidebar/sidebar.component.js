import React from 'react'
import './sidebar.styles.css'

import {Link} from 'react-router-dom'
import Logo from '../logo/logo.component'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo-cont">
                <Logo linkTo="home" />
            </div>
            <Link to="myrecipes">My Recipes</Link>
            <Link to="addrecipe">Add Recipes</Link>
            <Link to="profile">Profile</Link>
            <Link to="settings">Settings</Link>
        </div>
    )
}

export default Sidebar