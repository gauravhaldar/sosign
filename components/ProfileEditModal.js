"use client";

import { useState, useRef } from "react";
import { FaTimes, FaCamera, FaSpinner, FaPhone } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function ProfileEditModal({ isOpen, onClose }) {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [designation, setDesignation] = useState(user?.designation || "");
    const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError("Image size should be less than 2MB");
                return;
            }
            setProfilePicture(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("bio", bio);
            formData.append("designation", designation);
            formData.append("mobileNumber", mobileNumber);
            if (profilePicture) {
                formData.append("profilePicture", profilePicture);
            }

            await updateProfile(formData);
            setSuccess("Profile updated successfully!");
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setError(err.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const getAvatarUrl = () => {
        if (previewUrl) return previewUrl;
        if (user?.photoURL) return user.photoURL;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random&size=200`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-[#1a1a2e]">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <FaTimes className="text-gray-600" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                                <img
                                    src={getAvatarUrl()}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 w-10 h-10 bg-[#F43676] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#e02a60] transition-colors"
                            >
                                <FaCamera />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Click camera to change photo (max 2MB)</p>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#F43676] transition-colors"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                            Designation
                        </label>
                        <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#F43676] transition-colors"
                            placeholder="e.g., Activist, Student, Professional"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                            Mobile Number
                        </label>
                        <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#F43676] transition-colors"
                                placeholder="e.g., +91 9876543210"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                            Bio <span className="text-gray-400 font-normal">({bio.length}/500)</span>
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value.slice(0, 500))}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#F43676] transition-colors resize-none"
                            placeholder="Tell us about yourself and your passion for change..."
                        />
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
                            {success}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white font-semibold rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
