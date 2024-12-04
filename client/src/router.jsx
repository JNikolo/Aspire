import { createBrowserRouter } from "react-router-dom";

import App from './App';
import { LoginPage } from "./pages/LoginPage";
import { SurveyPage } from "./pages/SurveyPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/ProfilePage";
// import {  } from "./pages/";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/login',
        element: <LoginPage/>,
    },
    {
        path: '/survey',
        element: <SurveyPage/>,
    },
    {
        path: '/signup',
        element: <SignUpPage />
    },
    {
        path: '/profile',
        element: <ProfilePage />
    }
])
