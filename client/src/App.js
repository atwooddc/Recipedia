import HomePage from "./pages/homepage/home.page";
import Register from "./pages/register/register.page";
import Login from "./pages/login/login.page";
import ErrorPage from './pages/error/error.page';
import MyRecipesPage from "./pages/my-recipes/my-recipes.page";
import AddRecipePage from './pages/add-recipe/add-recipe.page'
import ProfilePage from './pages/profile/profile.page'
import SettingsPage from './pages/settings/settings.page'

import Layout from './components/layout/layout.component'
import RequireAuth from "./components/RequireAuth";

import {Routes, Route} from 'react-router-dom'

function App(){
    return(
        <Routes>
            <Route path="/" errorElement={<ErrorPage/>}> 
                {/* Public Routes */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>

                {/* Private Routes */}
                {/* Note: RequireAuth wraps everything that is to be protected. In order to reach these routes, 
                the use must be logged in. Layout wraps all of these to include the sidebar layout for all of the
                paths in the app. */}
                <Route element={<RequireAuth/>}>
                    <Route element={<Layout/>}>
                        <Route path="test" element={<p>TEST IS PROTECTED</p>}/>
                        <Route path="myrecipes" element={<MyRecipesPage/>}/>
                        <Route path="addrecipe" element={<AddRecipePage/>}/>
                        <Route path="profile" element={<ProfilePage/>}/>
                        <Route path="settings" element={<SettingsPage/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App;