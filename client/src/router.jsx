import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SurveyPage } from "./pages/SurveyPage";
import { ProfilePage } from "./pages/ProfilePage";
import { HomePage } from "./pages/HomePage";
import { SSOFallback } from "./components/SSOFallback";
import { DashboardPage } from "./pages/DashboardPage";
import { CommunitiesPage } from "./pages/CommunitiesPage";

import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { RootLayout } from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/survey/:habitId/edit",
        element: <SurveyPage />,
      },
      {
        path: "/survey/new",
        element: <SurveyPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
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
  {
    path: "/communities",
    element: <CommunitiesPage />,
  },
]);
