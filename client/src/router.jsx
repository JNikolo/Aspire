import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SurveyPage } from "./pages/SurveyPage";
import { SSOFallback } from "./components/SSOFallback";
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
]);
