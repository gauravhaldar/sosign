"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHome, FaShare } from "react-icons/fa";

function PetitionSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [petitionId, setPetitionId] = useState(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setPetitionId(id);
    }
  }, [searchParams]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleViewPetition = () => {
    if (petitionId) {
      router.push(`/currentpetitions/${petitionId}`);
    } else {
      router.push("/currentpetitions");
    }
  };

  const handleShare = () => {
    if (navigator.share && petitionId) {
      navigator.share({
        title: "Check out my petition!",
        text: "I just created a petition on soSign. Help me by signing it!",
        url: `${window.location.origin}/currentpetitions/${petitionId}`,
      });
    } else {
      // Fallback: copy to clipboard
      const url = petitionId
        ? `${window.location.origin}/currentpetitions/${petitionId}`
        : `${window.location.origin}/currentpetitions`;
      navigator.clipboard.writeText(url);
      alert("Petition link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "spring",
            bounce: 0.5,
          }}
          className="mb-6"
        >
          <FaCheckCircle className="text-6xl text-green-500 mx-auto" />
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Petition Filed Successfully! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          Congratulations! Your petition has been successfully submitted and is
          now live. Start sharing it with your friends and family to gather
          support for your cause.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={handleViewPetition}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View My Petition
          </button>

          <button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <FaShare className="text-sm" />
            Share Petition
          </button>

          <button
            onClick={handleGoHome}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaHome className="text-sm" />
            Go to Homepage
          </button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 p-4 bg-blue-50 rounded-lg"
        >
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> The more signatures you collect, the
            stronger your voice becomes. Share your petition on social media and
            with your network!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PetitionSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <PetitionSuccessContent />
    </Suspense>
  );
}
