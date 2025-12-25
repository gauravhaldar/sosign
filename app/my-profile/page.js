"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaCopy, FaUser, FaEnvelope, FaBriefcase, FaPhone, FaKey } from "react-icons/fa";
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
      <div className="min-h-screen flex justify-center items-center bg-[#f0f2f5]">
        <div className="text-[#F43676] text-lg font-medium">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f0f2f5]">
        <div className="text-center text-[#F43676] text-xl">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#fce4ec] to-[#f8bbd9] py-6 px-8 sm:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">My Profile</h1>
          <nav className="flex items-center gap-2 text-sm text-[#1a1a2e]">
            <Link href="/" className="hover:text-[#F43676] transition-colors">Home</Link>
            <FaChevronRight className="text-xs text-gray-500" />
            <span className="text-[#1a1a2e] font-medium">My Profile</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 sm:px-16 lg:px-24 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <div className="bg-white shadow-lg rounded-3xl p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              {/* Profile Image */}
              <div className="relative">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.name || "User Profile"}
                    width={140}
                    height={140}
                    className="rounded-full border-4 border-[#F43676] shadow-lg"
                  />
                ) : (
                  <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#F43676] to-[#f8bbd9] flex items-center justify-center shadow-lg">
                    <FaUser className="text-white text-5xl" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-2">
                  {user.name || "Guest"}
                </h2>

                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <FaEnvelope className="text-[#F43676]" />
                    {user.email}
                  </p>
                  {user.designation && (
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <FaBriefcase className="text-[#F43676]" />
                      {user.designation}
                    </p>
                  )}
                  {user.mobileNumber && (
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <FaPhone className="text-[#F43676]" />
                      {user.mobileNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Unique Code Section */}
            {user.uniqueCode && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <FaKey className="text-[#F43676]" />
                  <p className="text-[#1a1a2e] font-semibold">Your Unique Referral Code</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    value={user.uniqueCode}
                    readOnly
                    className="w-full sm:flex-1 px-4 sm:px-5 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 font-mono text-sm sm:text-base tracking-widest text-[#1a1a2e] focus:outline-none text-center sm:text-left"
                  />
                  <button
                    onClick={handleCopyCode}
                    className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl font-medium transition-all ${copied
                      ? "bg-green-500 text-white"
                      : "bg-[#F43676] text-white hover:bg-[#e02a60]"
                      }`}
                  >
                    <FaCopy />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Share this code with others. When they sign petitions using your code, you'll be credited.
                </p>
              </div>
            )}
          </div>

          {/* Created Petitions Card */}
          {/* <div className="bg-white shadow-lg rounded-3xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <p className="text-[#F43676] font-medium mb-2">Your Activity</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
                My Created Petitions
              </h2>
            </div>

            {userPetitions.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#fce4ec] flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#F43676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">You haven&apos;t created any petitions yet.</p>
                <Link
                  href="/create-petition"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#F43676] text-white rounded-xl font-medium hover:bg-[#e02a60] transition-colors"
                >
                  Create Your First Petition
                  <FaChevronRight className="text-xs" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userPetitions.map((petition) => (
                  <Link
                    key={petition.slug}
                    href={`/${petition.type === "current"
                        ? "currentpetitions"
                        : "successfulpetitions"
                      }/${petition.slug}`}
                  >
                    <div className="bg-[#f0f2f5] rounded-2xl p-5 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[#F43676]">
                      <h3 className="text-lg font-semibold text-[#1a1a2e] mb-3 line-clamp-2">
                        {petition.message}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className={`px-3 py-1 rounded-full font-medium ${petition.type === "successful"
                            ? "bg-green-100 text-green-600"
                            : "bg-[#fce4ec] text-[#F43676]"
                          }`}>
                          {petition.type === "successful" ? "Successful" : "Active"}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 font-medium">
                          {petition.signatures} signatures
                        </span>
                      </div>
                      {petition.location && (
                        <p className="text-gray-500 text-sm mt-3">
                          📍 {petition.location}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
