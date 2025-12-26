"use client";

import { useState, useEffect, Suspense } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import { auth, provider } from "../../utils/Firebase";
import { signInWithPopup } from "firebase/auth";

function LoginContent() {
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

  const { login, signup, loading, googleLogin } = useAuth();
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-pink-100">
        {/* Toggle Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1a1a2e]">
          {isLogin ? "Welcome Back!" : "Join SoSign"}
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          {isLogin ? "Login to continue your journey" : "Create your account to get started"}
        </p>

        {/* Continue with Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border-2 border-gray-200 rounded-xl py-3 mb-4 hover:border-[#F43676] hover:bg-pink-50 transition-all duration-200 font-medium"
        >
          <Image
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-3"
            width={20}
            height={20}
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-200" />
          <span className="px-3 text-gray-400 text-sm font-medium">or</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        {isLogin ? (
          // ------------------- LOGIN FORM -------------------
          <form className="space-y-5" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-11 text-gray-400 hover:text-[#F43676] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              Login
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By joining or logging in, you accept{" "}
              <span className="text-[#F43676] cursor-pointer hover:underline">
                sosign.in Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#F43676] cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>

            <p className="text-sm text-center text-gray-600 pt-2">
              Don&apos;t have an account?{" "}
              <span
                className="text-[#F43676] font-semibold cursor-pointer hover:underline"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                placeholder="Your designation"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile
              </label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Create Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-11 text-gray-400 hover:text-[#F43676] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-11 text-gray-400 hover:text-[#F43676] transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {signupError && (
              <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{signupError}</p>
            )}

            <button className="w-full bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-2">
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600 pt-2">
              Already have an account?{" "}
              <span
                className="text-[#F43676] font-semibold cursor-pointer hover:underline"
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

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-pink-100">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-xl w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto mb-6"></div>
          <div className="h-12 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-1/4 mx-auto mb-6"></div>
          <div className="space-y-5">
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-12 bg-pink-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
