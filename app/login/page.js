"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { auth, provider } from "../../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import { FaChevronRight } from "react-icons/fa";

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
      const user = result.user;
      await googleLogin(user);
      router.push(redirectUrl);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setLoginError("Failed to sign in with Google.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
        <div className="text-[#F43676] text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#fce4ec] to-[#f8bbd9] py-6 px-8 sm:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <nav className="flex items-center gap-2 text-sm text-[#1a1a2e]">
            <Link href="/" className="hover:text-[#F43676] transition-colors">Home</Link>
            <FaChevronRight className="text-xs text-gray-500" />
            <span className="text-[#1a1a2e] font-medium">{isLogin ? "Login" : "Sign Up"}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">
          {/* Toggle Heading */}
          <div className="text-center mb-6">
            <p className="text-[#F43676] font-medium mb-2">Welcome to SoSign</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
              {isLogin ? "Login to your account" : "Create your account"}
            </h2>
          </div>

          {/* Continue with Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center border-2 border-gray-200 rounded-xl py-3 mb-6 hover:bg-gray-50 hover:border-[#F43676] transition-all group"
          >
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-3"
              width={20}
              height={20}
            />
            <span className="font-medium text-gray-700 group-hover:text-[#1a1a2e]">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-200" />
            <span className="px-4 text-gray-400 text-sm font-medium">or</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          {isLogin ? (
            // ------------------- LOGIN FORM -------------------
            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F43676] transition-colors"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#F43676] transition-colors"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-10 text-gray-400 hover:text-[#F43676] transition-colors"
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
                className="w-full bg-[#F43676] text-white py-3 rounded-xl font-medium hover:bg-[#e02a60] transition-colors shadow-lg hover:shadow-xl"
              >
                Login
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By joining or logging in, you accept{" "}
                <Link href="/terms" className="text-[#F43676] hover:underline">
                  SoSign Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#F43676] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <p className="text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-[#F43676] font-semibold hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </button>
              </p>
            </form>
          ) : (
            // ------------------- SIGNUP FORM -------------------
            <form className="space-y-4" onSubmit={handleSignupSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F43676] transition-colors"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F43676] transition-colors"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  placeholder="Your designation"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F43676] transition-colors"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F43676] transition-colors"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F43676] transition-colors"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Create Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#F43676] transition-colors"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-10 text-gray-400 hover:text-[#F43676] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#F43676] transition-colors"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-10 text-gray-400 hover:text-[#F43676] transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {signupError && (
                <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{signupError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#F43676] text-white py-3 rounded-xl font-medium hover:bg-[#e02a60] transition-colors shadow-lg hover:shadow-xl"
              >
                Sign Up
              </button>

              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-[#F43676] font-semibold hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
