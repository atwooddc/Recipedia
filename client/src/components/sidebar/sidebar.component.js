import React from "react";
import "./sidebar.styles.css";

import { Link } from "react-router-dom";
import Logo from "../logo/logo.component";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { addBaseUrlClient } from "../../utils/getBaseClientUrl";

import useAuth from "../../hooks/useAuth";

const drawerWidth = 240;

export default function Sidebar() {
    const { setAuth } = useAuth();
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
                    <div className="navbar-logo-cont">
                        <Logo linkTo="home" />
                    </div>
                    <List>
                        {["home","myrecipes", "addrecipe", "profile", "settings"].map(
                            (text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton component={Link} to={text}>
                                        <ListItemIcon>
                                            {index === 0 ? (
                                                <DashboardIcon />
                                            ) : index === 1 ? (
                                                <ReceiptLongIcon />
                                            ) : index === 2 ? (
                                                <AddBoxIcon />
                                            ) : index === 3 ? (
                                                <Person2Icon />
                                            ) : (
                                                <SettingsIcon />
                                            )}
                                        </ListItemIcon>

                                        <ListItemText>
                                            {index === 0
                                                ? "Dashboard"
                                                : index === 1
                                                ? "My Recipes"
                                                : index === 2
                                                ? "Add Recipes"
                                                : index === 3
                                                ? "Profile"
                                                : "Settings"}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            )
                        )}

                        {/* We are doing the logout button separate because not using React router */}
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    setAuth(undefined);
                                    window.location.href = addBaseUrlClient("auth/logout");
                                }}
                            >
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    {/* <Divider /> */}
                </Drawer>
            </Box>
        </ThemeProvider>
    );
}
