import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SurveyPage } from "./pages/SurveyPage";
import { ProfilePage } from "./pages/ProfilePage";
import { HomePage } from "./pages/HomePage";
import { SSOFallback } from "./components/SSOFallback";
import { DashboardPage } from "./pages/DashboardPage";

import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { RootLayout } from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/survey/:habitId/edit",
        element: <SurveyPage />,
      },
      {
        path: "/survey/new",
        element: <SurveyPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
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
]);
