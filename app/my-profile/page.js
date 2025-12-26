"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaUser, FaEnvelope, FaBriefcase, FaPhone, FaCopy } from "react-icons/fa";
import { petitions as currentPetitions } from "../../components/CurrentPetitions";
import { successfulPetitions } from "../../components/SuccessfulPetitionsData";

const MyProfilePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userPetitions, setUserPetitions] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      const allPetitions = [
        ...currentPetitions.map((p) => ({ ...p, type: "current" })),
        ...successfulPetitions.map((p) => ({ ...p, type: "successful" })),
      ];
      const createdPetitions = allPetitions.filter(
        (p) => p.creatorId === user._id
      );
      setUserPetitions(createdPetitions);
    }
  }, [user, loading, router]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.uniqueCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex justify-center items-center">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex justify-center items-center">
        <div className="text-center text-red-500 text-xl">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Banner */}
      <div className="bg-pink-100 border-b border-pink-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1a1a2e]">My Profile</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#F43676] transition-colors">
              Home
            </Link>
            <FaChevronRight className="text-gray-400 text-xs" />
            <span className="text-[#1a1a2e] font-medium">My Profile</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-[#f0f2f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-pink-100">
            <div className="flex flex-col items-center gap-6">
              {/* Profile Image */}
              {user.photoURL && (
                <div className="relative">
                  <Image
                    src={user.photoURL}
                    alt={user.name || "User Profile"}
                    width={140}
                    height={140}
                    className="rounded-full border-4 border-[#F43676] shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-[#F43676] to-[#e02a60] rounded-full flex items-center justify-center shadow-lg">
                    <FaUser className="text-white text-sm" />
                  </div>
                </div>
              )}

              {/* User Name */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">
                  {user.name || "Guest"}
                </h2>
                <p className="text-gray-500 text-sm">Member Profile</p>
              </div>

              {/* User Details */}
              <div className="w-full max-w-2xl space-y-4 mt-4">
                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#F43676] to-[#e02a60] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Email Address</p>
                    <p className="text-gray-600 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Designation */}
                {user.designation && (
                  <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F43676] to-[#e02a60] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaBriefcase className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Designation</p>
                      <p className="text-gray-600">{user.designation}</p>
                    </div>
                  </div>
                )}

                {/* Mobile */}
                {user.mobileNumber && (
                  <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F43676] to-[#e02a60] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Mobile Number</p>
                      <p className="text-gray-600">{user.mobileNumber}</p>
                    </div>
                  </div>
                )}

                {/* Unique Code */}
                {user.uniqueCode && (
                  <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-2xl border-2 border-pink-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#F43676] to-[#e02a60] rounded-lg flex items-center justify-center">
                        <FaCopy className="text-white text-sm" />
                      </div>
                      <p className="text-lg font-bold text-[#1a1a2e]">Your Unique Referral Code</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        value={user.uniqueCode}
                        readOnly
                        className="flex-1 p-4 border-2 border-pink-200 rounded-xl bg-white font-mono text-lg tracking-wider text-center font-bold text-[#F43676] focus:outline-none focus:border-[#F43676]"
                      />
                      <button
                        onClick={handleCopyCode}
                        className="bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
                      >
                        <FaCopy />
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-3 text-center">
                      Share this code with others. When they sign petitions using your code, you'll be credited!
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Link href="/my-petition" className="mt-6">
                <button className="bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                  View My Petitions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
