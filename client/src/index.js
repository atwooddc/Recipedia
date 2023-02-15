// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';

// import {RouterProvider, createRoutesFromElements, createBrowserRouter, Route} from 'react-router-dom'

// import HomePage from "./pages/homepage/home.page";
// import Register from "./pages/register/register.page";
// import Login from "./pages/login/login.page";
// import ErrorPage from './pages/error/error.page';

// const router = createBrowserRouter(createRoutesFromElements(
//     <Route path ="/" element = {<HomePage/>} errorElement = {<ErrorPage/>}>
//         {/* Public Routes */}
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         {/* Private Routes */}

//         {/* Catch All */}
//         <Route path='*' element={<p>The page you visited could not be found</p>}/>
//     </Route>
// ))

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/*' element={<App/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
