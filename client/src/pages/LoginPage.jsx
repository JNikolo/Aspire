import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInput } from "../components/FormInput";
import { LuCircleAlert, LuUser } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { SsoButton } from "../components/SsoButton";
import journeyIcon from "../assets/journeyIcon.png";

export function LoginPage() {
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  LuCircleAlert;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (!isSignInLoaded || loading) return;

    try {
      setError("");
      setLoading(true);

      const result = await signIn.create({
        identifier: data.username, // Clerk will handle both username and email
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!isSignInLoaded) return;

    try {
      setError("");
      setLoading(true);

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/sso-fallback",
      });
    } catch (err) {
      console.error("Error during Google sign in");
      setError("An error occurred during Google sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* Floating Error Alert */}
      {error && (
        <div className="fixed top-2 w-full z-50 p-4">
          <div className="alert alert-error flex justify-between items-center p-4 shadow-lg text-white bg-red-600">
            <div className="flex items-center">
              <LuCircleAlert className="h-6 w-6 mr-2" />
              <span>{error}</span>
            </div>
            <button
              className="btn btn-sm btn-circle text-black hover:bg-red-700"
              onClick={() => setError("")}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg mx-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-gray-700 font-medium">Logging you in...</p>
          </div>
        </div>
      )}

      {/* Left Panel - Hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 bg-blue-500 text-white p-6 md:p-10 flex-col justify-center items-start">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Aspire</h1>
        <p className="text-lg md:text-xl font-medium mb-10">
          Welcome Back to Your <br /> Journey
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
          <p className="text-gray-600">Welcome Back to Your Journey</p>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-black text-center">
            Welcome Back!
          </h2>
          <div className="divider"></div>

          <SsoButton
            provider="Google"
            icon={<FcGoogle size={20} />}
            handleSubmit={handleGoogleAuth}
            disabled={!isSignInLoaded || loading}
          />

          <div className="divider">Or use your credentials</div>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              label="Username or email"
              id="username"
              type="text"
              placeholder="Enter your username or email"
              registerOptions={register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              error={errors.username}
              icon={<LuUser size={20} />}
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              registerOptions={register("password", {
                required: "Password is required",
              })}
              error={errors.password}
              isPassword={true}
              showPassword={showPassword}
              togglePassword={() => setShowPassword((prev) => !prev)}
            />

            <div className="flex justify-end mb-2">
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={`btn bg-blue-500 hover:bg-blue-600 text-white w-full ${
                loading ? "loading-xs" : ""
              }`}
              disabled={loading || Object.keys(errors).length > 0}
            >
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don&apos;t have an account?{" "}
            <a href="signup" className="link link-primary font-bold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
