import React from "react";

import HomePage from "./pages/homepage/home.page";
import Register from "./pages/register/register.page";
import Login from "./pages/login/login.page";
import ErrorPage from "./pages/error/error.page";
import MyRecipesPage from "./pages/my-recipes/my-recipes.page";
import AddRecipePage from "./pages/add-recipe/add-recipe.page";
import AutoParsePage from "./pages/add-recipe/add-recipe-auto.page";
import ManualInsertPage from "./pages/add-recipe/add-recipe-manual.page";
import ProfilePage from "./pages/profile/profile.page";
import SettingsPage from "./pages/settings/settings.page";
import RecipePage from "./pages/recipe/recipe.page";
import WelcomePage from "./pages/welcome/welcome.page";

import Layout from "./components/layout/layout.component";
import RequireAuth from "./components/RequireAuth";

import { Routes, Route } from "react-router-dom";

function App() {
    // useEffect(() => {
    //     async function auth() {
    //         await fetch("auth/user", {
    //             method: "GET",
    //         })
    //             .then((resUser) => setUser(resUser.data))
    //             .catch((err) => console.log("ERROR: ", err.json));
    //     }

    //     auth();
    // }, []);

    return (
        <Routes>
            <Route path="/" errorElement={<ErrorPage />}>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Private Routes */}
                {/* Note: RequireAuth wraps everything that is to be protected. In order to reach these routes,
                the use must be logged in. Layout wraps all of these to include the sidebar layout for all of the
                paths in the app. */}
                <Route element={<RequireAuth />}>
                    <Route element={<Layout />}>
                        <Route path="home" element={<WelcomePage />} />
                        <Route path="myrecipes" element={<MyRecipesPage />} />
                        <Route path="recipe/:id" element={<RecipePage />} />
                        <Route path="addrecipe" element={<AddRecipePage />} />
                        <Route
                            path="addrecipe/autoparse"
                            element={<AutoParsePage />}
                        />
                        <Route
                            path="addrecipe/manualinsert"
                            element={<ManualInsertPage />}
                        />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
