"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PetitionDetailPage() {
  const { slug } = useParams(); // This is actually the petition ID
  const [petition, setPetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetition = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/successful-petitions/${slug}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Debug: Log image data from backend
        console.log("Backend petition detail image data:", {
          id: data.successfulPetition._id,
          title: data.successfulPetition.petitionTitle,
          image: data.successfulPetition.image,
          hasImage: !!data.successfulPetition.image,
        });

        // Transform backend data to match frontend expectations
        const transformedPetition = {
          id: data.successfulPetition._id,
          name: data.successfulPetition.petitionStarterName,
          role: "Change Maker",
          message:
            data.successfulPetition.outcome ||
            "Successfully achieved the petition goal!",
          image: data.successfulPetition.image,
          signatures: data.successfulPetition.totalSignatures,
          decisionMakers:
            data.successfulPetition.decisionMakers?.map((dm) => dm.name) || [],
          issue: data.successfulPetition.issue,
          started: new Date(
            data.successfulPetition.startedDate
          ).toLocaleDateString(),
          starter: data.successfulPetition.petitionStarterName,
          location: data.successfulPetition.location,
          petitionTitle: data.successfulPetition.petitionTitle,
          successDate: new Date(
            data.successfulPetition.successDate
          ).toLocaleDateString(),
          category: data.successfulPetition.category || "Other",
        };

        setPetition(transformedPetition);
        setError(null);
      } catch (err) {
        console.error("Error fetching petition:", err);
        setError(err.message);
        setPetition(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPetition();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-12 w-3/4 mx-auto rounded mb-10"></div>
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
            <div className="md:w-3/5 bg-gray-300 h-96 rounded-2xl"></div>
            <div className="md:w-2/5 space-y-6">
              <div className="bg-gray-300 h-24 rounded-2xl"></div>
              <div className="bg-gray-300 h-32 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Petition
        </h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!petition) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Successful Petition Not Found
        </h1>
        <p className="text-gray-500">
          The petition you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-6 lg:px-8 bg-white shadow-lg rounded-xl mt-8 mb-12">
      {/* Success Badge */}
      <div className="flex justify-center mb-6">
        <span className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold text-lg">
          ✅ Successfully Completed
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-gray-900 leading-tight">
        {petition.petitionTitle}
      </h1>

      <p className="text-xl text-gray-600 text-center mb-10 max-w-4xl mx-auto">
        {petition.message}
      </p>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16 h-[calc(100vh-200px)] overflow-hidden">
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-3/5 flex-shrink-0 aspect-video sticky top-0 md:h-full"
        >
          {petition.image ? (
            <Image
              src={petition.image}
              alt={petition.petitionTitle}
              width={1200}
              height={675}
              className="w-full h-full object-contain rounded-2xl shadow-xl border border-gray-200"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-xl border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Success Story
                </h3>
                <p className="text-green-600">
                  This petition achieved its goal!
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Side - Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-2/5 flex flex-col gap-6 overflow-y-auto pr-4"
        >
          {/* Total Signatures */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 text-center shadow-lg">
            <p className="text-lg font-medium">Total Signatures Achieved</p>
            <p className="text-3xl font-bold">
              {petition.signatures.toLocaleString()}
            </p>
          </div>

          {/* Success Date */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6 text-center shadow-lg">
            <p className="text-lg font-medium">Victory Declared</p>
            <p className="text-xl font-bold">{petition.successDate}</p>
          </div>

          {/* Category */}
          {petition.category && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 text-center shadow-lg">
              <p className="text-lg font-medium">Category</p>
              <p className="text-xl font-bold">{petition.category}</p>
            </div>
          )}

          {/* Petition Starter Info */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Victory Champion
            </p>
            <p className="text-xl font-bold text-gray-900">
              {petition.starter}
            </p>
            <p className="text-sm text-gray-600">{petition.role}</p>
          </div>
        </motion.div>
      </div>

      {/* Additional Petition Details */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Decision Makers */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border border-green-200">
          <h3 className="font-bold text-lg text-green-800 mb-3 flex items-center">
            🏛️ Decision Makers Contacted
          </h3>
          <div className="space-y-2">
            {petition.decisionMakers && petition.decisionMakers.length > 0 ? (
              petition.decisionMakers.map((maker, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-green-100"
                >
                  <p className="text-green-700 font-medium">{maker}</p>
                </div>
              ))
            ) : (
              <p className="text-green-600">
                No specific decision makers listed
              </p>
            )}
          </div>
        </div>

        {/* Issue Resolved */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-200">
          <h3 className="font-bold text-lg text-blue-800 mb-3 flex items-center">
            🎯 Issue Successfully Addressed
          </h3>
          <p className="text-blue-700 leading-relaxed">{petition.issue}</p>
        </div>

        {/* Location Impact */}
        {petition.location && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-purple-200">
            <h3 className="font-bold text-lg text-purple-800 mb-3 flex items-center">
              📍 Impact Location
            </h3>
            <p className="text-purple-700 text-lg font-medium">
              {petition.location}
            </p>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-sm border border-orange-200">
          <h3 className="font-bold text-lg text-orange-800 mb-3 flex items-center">
            ⏰ Success Timeline
          </h3>
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3 border border-orange-100">
              <p className="text-sm text-orange-600">Started</p>
              <p className="text-orange-700 font-medium">{petition.started}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-orange-100">
              <p className="text-sm text-orange-600">Victory Achieved</p>
              <p className="text-orange-700 font-medium">
                {petition.successDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Section */}
      <div className="mt-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 text-center border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          🎉 This petition was successful!
        </h2>
        <p className="text-green-700 text-lg mb-6">
          Thanks to {petition.signatures.toLocaleString()} supporters, this
          petition achieved its goal and made a real difference!
        </p>
        <div className="flex justify-center">
          <div className="bg-white rounded-lg p-4 shadow-md border border-green-200">
            <p className="text-green-800 font-semibold">
              Champion: {petition.starter}
            </p>
          </div>
        </div>
      </div>

      {/* Share This Success Story */}
      <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          🌟 Share This Success Story
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Inspire others by sharing this successful petition and showing that
          change is possible!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => {
              const shareText = `🎉 Check out this successful petition: "${
                petition.petitionTitle
              }" - ${petition.signatures.toLocaleString()} people made a difference!`;
              const shareUrl = window.location.href;
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}&quote=${encodeURIComponent(shareText)}`,
                "_blank"
              );
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center gap-2"
          >
            📘 Facebook
          </button>
          <button
            onClick={() => {
              const shareText = `🎉 Success! "${
                petition.petitionTitle
              }" achieved its goal with ${petition.signatures.toLocaleString()} signatures! ${
                window.location.href
              }`;
              window.open(
                `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                "_blank"
              );
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center gap-2"
          >
            💬 WhatsApp
          </button>
          <button
            onClick={() => {
              const shareText = `🎉 Success story: "${
                petition.petitionTitle
              }" - ${petition.signatures.toLocaleString()} people made change happen!`;
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareText
                )}&url=${encodeURIComponent(window.location.href)}`,
                "_blank"
              );
            }}
            className="bg-blue-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center gap-2"
          >
            🐦 Twitter
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center gap-2"
          >
            🔗 Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
