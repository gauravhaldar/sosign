"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { petitions as currentPetitions } from "../../components/CurrentPetitions";
import { successfulPetitions } from "../../components/SuccessfulPetitionsData";

const MyProfilePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userPetitions, setUserPetitions] = useState([]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My Profile
        </h1>
        <div className="flex flex-col items-center gap-4">
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.name || "User Profile"}
              width={120}
              height={120}
              className="rounded-full border-4 border-blue-400 shadow-md"
            />
          )}
          <p className="text-2xl font-semibold text-gray-900">
            {user.name || "Guest"}
          </p>
          <p className="text-gray-600">{user.email}</p>
          {user.designation && (
            <p className="text-gray-600">Designation: {user.designation}</p>
          )}
          {user.mobileNumber && (
            <p className="text-gray-600">Mobile: {user.mobileNumber}</p>
          )}
          {user.uniqueCode && (
            <div className="w-full mt-4">
              <p className="text-gray-700 font-medium mb-1">Your Unique Code</p>
              <div className="flex items-center gap-2">
                <input
                  value={user.uniqueCode}
                  readOnly
                  className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono tracking-widest"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(user.uniqueCode)}
                  className="bg-[#3650AD] text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Share this code. When others sign with it, you’ll be credited.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          My Created Petitions
        </h2>
        {userPetitions.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven&apos;t created any petitions yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userPetitions.map((petition) => (
              <Link
                key={petition.slug}
                href={`/${
                  petition.type === "current"
                    ? "currentpetitions"
                    : "successfulpetitions"
                }/${petition.slug}`}
              >
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <h3 className="text-xl font-semibold mb-2">
                    {petition.message}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Status:{" "}
                    {petition.type === "successful" ? "Successful" : "Active"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Signatures: {petition.signatures}
                  </p>
                  {petition.location && (
                    <p className="text-gray-600 text-sm">
                      Location: {petition.location}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
