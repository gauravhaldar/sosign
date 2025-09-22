"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import { auth, provider } from "../../utils/Firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/");

  // State for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // State for signup form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobile, setMobile] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const { login, signup, loading, googleLogin } = useAuth(); // Re-added googleLogin
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get redirect URL from query parameters
  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [searchParams]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      await login(loginEmail, loginPassword);
      router.push(redirectUrl);
    } catch (error) {
      setLoginError(error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");

    // Validate required fields
    if (!firstName.trim()) {
      setSignupError("First name is required");
      return;
    }
    if (!designation.trim()) {
      setSignupError("Designation is required");
      return;
    }
    if (!signupEmail.trim()) {
      setSignupError("Email is required");
      return;
    }
    if (!mobile.trim()) {
      setSignupError("Mobile number is required");
      return;
    }
    if (!createPassword.trim()) {
      setSignupError("Password is required");
      return;
    }
    if (!confirmPassword.trim()) {
      setSignupError("Please confirm your password");
      return;
    }

    if (createPassword !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      const name = `${firstName} ${lastName}`;
      await signup(name, designation, signupEmail, mobile, createPassword);
      router.push(redirectUrl);
    } catch (error) {
      setSignupError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;

      // Call the simulated backend login from AuthContext
      await googleLogin(user);
      router.push(redirectUrl);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setLoginError("Failed to sign in with Google.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        {/* Toggle Heading */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          {isLogin ? "Login to SoSign" : "Create your account"}
        </h2>

        {/* Continue with Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-4 hover:bg-gray-100 transition"
        >
          <Image
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
            width={20}
            height={20}
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {isLogin ? (
          // ------------------- LOGIN FORM -------------------
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#3650AD] text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>

            <p className="text-xs text-gray-500 text-center">
              By joining or logging in, you accept{" "}
              <span className="text-[#3650AD] cursor-pointer">
                sosign.in Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#3650AD] cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                className="text-[#3650AD] font-medium cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </p>
          </form>
        ) : (
          // ------------------- SIGNUP FORM -------------------
          <form className="space-y-4" onSubmit={handleSignupSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                placeholder="Your designation"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Create Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {signupError && (
              <p className="text-red-500 text-sm text-center">{signupError}</p>
            )}

            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                className="text-[#3650AD] font-medium cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
