import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <SignUpPage />
    }
]);