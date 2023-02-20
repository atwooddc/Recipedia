import React from "react";
import "./sidebar.styles.css";

import { Link } from "react-router-dom";
import Logo from "../logo/logo.component";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const drawerWidth = 240;

export default function Sidebar() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#F26969",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />

                    <Divider />
                    <List>
                        {["myrecipes", "addrecipe", "profile", "settings"].map(
                            (text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton component={Link} to={text}>
                                        <ListItemIcon>
                                            {index === 0 ? (
                                                <ReceiptLongIcon />
                                            ) : index === 1 ? (
                                                <AddBoxIcon />
                                            ) : index === 2 ? (
                                                <Person2Icon />
                                            ) : (
                                                <SettingsIcon />
                                            )}
                                        </ListItemIcon>

                                        <ListItemText>
                                            {index === 0
                                                ? "My Recipes"
                                                : index === 1
                                                ? "Add Recipes"
                                                : index === 2
                                                ? "Profile"
                                                : "Settings"}{" "}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            )
                        )}
                    </List>
                    <Divider />
                </Drawer>
            </Box>
        </ThemeProvider>
    );
}

const Sidebar2 = () => {
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
    );
};
