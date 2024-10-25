import { createBrowserRouter } from "react-router-dom";
import App from './App';
import { LoginPage } from "./pages/LoginPage";
import { Survey } from "./pages/Survey";
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
        element: <Survey/>,
    },
])
