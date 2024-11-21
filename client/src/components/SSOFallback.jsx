import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

export const SSOFallback = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Retrieve a token for backend API calls
        const token = await getToken();

        // Send user token to your backend
        const response = await fetch(
          "http://localhost:3000/register/sso-callback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to store Google user information");
        }

        const data = await response.json();

        const { newUser } = data;

        // Redirect the user to the appropriate page
        if (newUser) {
          navigate("/survey", { state: { fromSource: "/signup" } });
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error during SSO callback handling:", err);
        // Handle errors appropriately (e.g., show an error message)
      }
    };

    processCallback();
  }, [getToken, navigate, user]);

  return <div>Processing sign-up...</div>;
};
