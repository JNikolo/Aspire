import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SurveyPage } from "./pages/SurveyPage";
import { SSOFallback } from "./components/SSOFallback";
import { DashboardPage } from "./pages/DashboardPage";

import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

// import {  } from "./pages/";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/sso-callback",
    element: (
      <AuthenticateWithRedirectCallback
        signInUrl="/login"
        signUpUrl="/signup"
        signInFallbackRedirectUrl={"/sso-fallback"}
        signUpFallbackRedirectUrl={"/sso-fallback"}
      />
    ),
  },
  {
    path: "/survey/:habitId/edit",
    element: <SurveyPage />,
  },
  {
    path: "/sso-fallback",
    element: <SSOFallback />,
  },
  {
    path: "/survey/new",
    element: <SurveyPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);
