import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export const SSOFallback = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Retrieve a token for backend API calls
        const token = await getToken();

        // Send user token to your backend
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/register/sso-callback`,
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
          navigate("/survey/new");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error during SSO callback handling: ", err);
        navigate("/login");
      }
    };

    processCallback();
  }, [navigate, getToken]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg mx-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-700 font-medium">Creating your account...</p>
      </div>
    </div>
  );
};
