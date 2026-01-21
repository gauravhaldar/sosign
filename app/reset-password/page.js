"use client";

import { useState, useEffect, Suspense } from "react";
import { Eye, EyeOff, Check, Loader2, AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordContent() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [success, setSuccess] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tokenParam = searchParams.get("token");
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            setError("Invalid or missing reset token. Please request a new password reset.");
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!password.trim()) {
            setError("Please enter a new password");
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters with uppercase, lowercase, and special character");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const response = await fetch(`${backendUrl}/api/users/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setMessage(data.message || "Password has been reset successfully!");
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                setError(data.message || "Failed to reset password. Please try again.");
            }
        } catch (err) {
            console.error("Reset password error:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (!token && error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 px-4 py-8">
                <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-pink-100 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="text-red-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Invalid Link</h2>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <Link href="/login">
                        <button className="bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                            Back to Login
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 px-4 py-8">
                <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-pink-100 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="text-green-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Password Reset!</h2>
                    <p className="text-gray-500 mb-6">{message}</p>
                    <p className="text-sm text-gray-400">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-pink-100">
                <h2 className="text-2xl font-bold text-center mb-2 text-[#1a1a2e]">
                    Create New Password
                </h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                    Enter your new password below
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            New Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#F43676] focus:outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            placeholder="Confirm new password"
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

                    {/* Password requirements */}
                    <div className="text-xs text-gray-500 space-y-1">
                        <p>Password must contain:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                            <li className={password.length >= 6 ? "text-green-500" : ""}>At least 6 characters</li>
                            <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>One uppercase letter</li>
                            <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>One lowercase letter</li>
                            <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-500" : ""}>One special character</li>
                        </ul>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
                    )}

                    {message && (
                        <p className="text-green-600 text-sm text-center bg-green-50 py-2 rounded-lg">{message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Resetting...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                    <p className="text-sm text-center text-gray-600 pt-2">
                        Remember your password?{" "}
                        <Link href="/login" className="text-[#F43676] font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

function ResetPasswordFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-pink-100">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-xl w-3/4 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto mb-6"></div>
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<ResetPasswordFallback />}>
            <ResetPasswordContent />
        </Suspense>
    );
}
