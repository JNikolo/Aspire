import journeyIcon from "../assets/journeyIcon.png";
import { useSignUp, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInput } from "../components/FormInput";
import { LuMail, LuAlertCircle, LuUser2 } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { SsoButton } from "../components/SsoButton";

export function SignUpPage() {
  const { isLoaded: isSignUpLoaded, signUp, setActive } = useSignUp();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (!isSignUpLoaded || loading) return;

    try {
      setError("");
      setLoading(true);
      console.log("Signing up with data:", data);
      const result = await signUp.create({
        emailAddress: data.email,
        username: data.username,
        password: data.password,
      });

      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        // Get the token after setting active session
        const token = await getToken();
        const response = await fetch(
          "http://localhost:3000/register/create-after-signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to sign up");
        } else {
          navigate("/survey", { state: { fromSource: "/signup" } });
        }
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!isSignUpLoaded) return;

    try {
      setError("");
      setLoading(true);

      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("Error during Google sign in:", err);
      setError("An error occurred during Google sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg mx-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-gray-700 font-medium">
              Creating your account...
            </p>
          </div>
        </div>
      )}

      {/* Left Panel - Hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 bg-blue-500 text-white p-6 md:p-10 flex-col justify-center items-start">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Aspire</h1>
        <p className="text-lg md:text-xl font-medium mb-10">
          Join the Journey to <br /> Achieve More
        </p>
        <div className="mt-5 w-full">
          <img
            src={journeyIcon}
            alt="Journey Icon"
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center items-center min-h-screen md:min-h-0">
        {/* Mobile Logo */}
        <div className="md:hidden text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">Aspire</h1>
          <p className="text-gray-600">Join the Journey to Achieve More</p>
        </div>

        <div className="w-full max-w-md mx-auto ">
          <h2 className="text-2xl font-bold mb-2 text-black text-center">
            Create Your Account
          </h2>
          <div className="divider"></div>

          {error && (
            <div className="alert alert-error mb-6">
              <LuAlertCircle className="h-6 w-6 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <SsoButton
            provider="Google"
            icon={<FcGoogle size={20} />}
            handleSubmit={handleGoogleAuth}
            disabled={!isSignUpLoaded || loading}
          />

          <div className="divider">Or enter your details</div>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="Enter your email address"
              registerOptions={register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              })}
              error={errors.email}
              icon={<LuMail size={20} />}
            />

            <FormInput
              label="Username (Optional)"
              id="username"
              type="text"
              placeholder="Enter your username"
              registerOptions={register("username", {
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be at most 20 characters",
                },
              })}
              error={errors.username}
              icon={<LuUser2 size={20} />}
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              registerOptions={register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, number and special character",
                },
              })}
              error={errors.password}
              isPassword={true}
              showPassword={showPassword}
              togglePassword={() => setShowPassword((prev) => !prev)}
            />

            <button
              type="submit"
              className={`btn bg-blue-500 hover:bg-blue-600 text-white w-full mt-2 ${
                loading ? "loading-xs" : ""
              }`}
              disabled={loading || Object.keys(errors).length > 0}
            >
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="login" className="link link-primary font-bold">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
