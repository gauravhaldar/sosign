"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import LoginModal from "../../../components/LoginModal";
import CommentsSection from "../../../components/CommentsSection";

export default function PetitionDetailPage() {
  const { slug } = useParams();
  const [petition, setPetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signError, setSignError] = useState(null);
  const [signSuccess, setSignSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [signatureStatus, setSignatureStatus] = useState({
    hasSigned: false,
    isCreator: false,
    canSign: false,
    loading: true,
  });

  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPetition = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/petitions/${slug}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPetition(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch petition:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPetition();
    }
  }, [slug]);

  // Prefill referral code from URL (?code=XXXX or ?ref=XXXX)
  useEffect(() => {
    const code = searchParams?.get("code") || searchParams?.get("ref");
    if (code) setReferralCode(code.toUpperCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check signature status when user or petition changes
  useEffect(() => {
    const checkSignatureStatus = async () => {
      if (!user || !petition || !petition._id) {
        setSignatureStatus((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        setSignatureStatus((prev) => ({ ...prev, loading: true }));
        const userInfo = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(
          `/api/petitions/${petition._id}/check-signature`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSignatureStatus({
            hasSigned: data.hasSigned,
            isCreator: data.isCreator,
            canSign: data.canSign,
            loading: false,
          });
        } else {
          setSignatureStatus((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error("Failed to check signature status:", error);
        setSignatureStatus((prev) => ({ ...prev, loading: false }));
      }
    };

    checkSignatureStatus();
  }, [user, petition]);

  const handleSignPetition = async () => {
    // Check if user is authenticated
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      setSigning(true);
      setSignError(null);
      setSignSuccess(false);

      const userInfo = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`/api/petitions/${petition._id}/sign`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referralCode: referralCode?.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign petition");
      }

      const data = await response.json();

      // Update the petition signature count in the UI
      setPetition((prev) => ({
        ...prev,
        numberOfSignatures: data.numberOfSignatures,
      }));

      // Update signature status to reflect that user has now signed
      setSignatureStatus((prev) => ({
        ...prev,
        hasSigned: true,
        canSign: false,
      }));

      setSignSuccess(true);
      setTimeout(() => setSignSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      setSignError(err.message);
      console.error("Failed to sign petition:", err);
    } finally {
      setSigning(false);
    }
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Loading petition...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Error loading petition: {error}</p>
      </div>
    );
  }

  if (!petition) {
    return (
      <div className="text-center py-20 text-gray-500">Petition not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-[#1a1a2e] leading-tight">
            {petition.title}
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-3/5 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
              {petition.petitionDetails?.image ? (
                <Image
                  src={petition.petitionDetails.image}
                  alt={petition.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-contain rounded-xl"
                />
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-[#3650AD]/10 to-[#F43676]/10 rounded-xl flex items-center justify-center">
                  <div className="text-[#1a1a2e] text-center">
                    <p className="text-4xl mb-3">📋</p>
                    <p className="text-lg font-medium text-gray-500">No Image Available</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/5 flex flex-col gap-6"
          >
            {/* Total Signatures */}
            <div className="bg-gradient-to-r from-[#3650AD] to-[#F43676] text-white rounded-2xl p-6 text-center shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <p className="text-lg font-medium opacity-90">Total Signatures</p>
              <p className="text-4xl font-bold mt-1">
                {petition.numberOfSignatures || 0}
              </p>
            </div>

            {/* Sign This Petition Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-[#1a1a2e]">Sign this Petition</h2>

              {/* Success Message */}
              {signSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <p className="font-medium">✓ Petition signed successfully!</p>
                  <p className="text-sm">Thank you for your support.</p>
                </div>
              )}

              {/* Error Message */}
              {signError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p className="font-medium">Error: {signError}</p>
                </div>
              )}

              {/* Authentication Check */}
              {!user ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    You need to be logged in to sign this petition.
                  </p>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="bg-[#3650AD] text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-0.5"
                  >
                    Login to Sign Petition
                  </button>
                </div>
              ) : signatureStatus.loading ? (
                <div className="text-center">
                  <p className="text-gray-600">Checking signature status...</p>
                </div>
              ) : signatureStatus.isCreator ? (
                <div className="text-center space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      📝 This is your petition
                    </p>
                    <p className="text-blue-600 text-sm">
                      You cannot sign your own petition.
                    </p>
                  </div>
                </div>
              ) : signatureStatus.hasSigned ? (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-green-800 font-medium">
                      ✓ You have signed this petition
                    </p>
                    <p className="text-green-600 text-sm">
                      Thank you for your support!
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Signed as:</p>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Signing as:</p>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                      Referral Code (optional)
                    </label>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) =>
                        setReferralCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter a friend's code"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength={12}
                    />
                  </div>
                  <button
                    onClick={handleSignPetition}
                    disabled={signing || !signatureStatus.canSign}
                    className="bg-[#3650AD] text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {signing ? "Signing..." : "Sign Petition"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Additional Petition Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Decision Makers */}
          {petition.decisionMakers && petition.decisionMakers.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2">
                <span className="text-[#F43676]">👥</span> Decision Makers
              </p>
              <p className="text-gray-600">
                {petition.decisionMakers.map((dm) => dm.name || dm).join(", ")}
              </p>
            </div>
          )}

          {/* Problem */}
          {petition.petitionDetails?.problem && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2">
                <span className="text-[#F43676]">⚠️</span> Problem
              </p>
              <p className="text-gray-600">{petition.petitionDetails.problem}</p>
            </div>
          )}

          {/* Solution */}
          {petition.petitionDetails?.solution && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2">
                <span className="text-[#F43676]">💡</span> Solution
              </p>
              <p className="text-gray-600">{petition.petitionDetails.solution}</p>
            </div>
          )}

          {/* Country */}
          {petition.country && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2">
                <span className="text-[#F43676]">🌍</span> Country
              </p>
              <p className="text-gray-600">{petition.country}</p>
            </div>
          )}

          {/* Petition Starter */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <p className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2">
              <span className="text-[#F43676]">✍️</span> Petition Starter
            </p>
            <p className="text-gray-700 font-medium">
              {petition.petitionStarter?.user?.name ||
                petition.petitionStarter?.name ||
                "Anonymous"}
            </p>
            <p className="text-sm text-gray-500">
              {petition.petitionStarter?.user?.designation ||
                petition.petitionStarter?.designation ||
                "Citizen"}
            </p>
            {petition.petitionStarter?.user?.email && (
              <p className="text-sm text-gray-500">
                {petition.petitionStarter.user.email}
              </p>
            )}
          </div>

          {/* Video URL */}
          {petition.petitionDetails?.videoUrl && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2">
                <span className="text-[#F43676]">🎬</span> Video
              </p>
              <a
                href={petition.petitionDetails.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3650AD] hover:text-[#F43676] underline font-medium transition-colors"
              >
                Watch Video
              </a>
            </div>
          )}

          {/* Petition Updates & Supporters */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <p className="font-bold text-[#1a1a2e] mb-3 flex items-center gap-2">
              <span className="text-[#F43676]">📊</span> Statistics
            </p>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <span className="font-medium">Total Supporters:</span> {petition.numberOfSignatures || 0}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Started:</span> {new Date(petition.createdAt).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Last Updated:</span> {new Date(petition.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Share This Petition */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <p className="font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
            <span className="text-[#F43676]">🔗</span> Share This Petition
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {(() => {
              const baseUrl =
                typeof window !== "undefined" ? window.location.origin : "";
              const path = `/currentpetitions/${slug}`;
              const shareUrl = new URL(baseUrl + path);
              if (user?.uniqueCode) {
                shareUrl.searchParams.set("code", user.uniqueCode);
              }
              const text = encodeURIComponent(
                `Support this petition: ${petition.title}`
              );
              const encodedUrl = encodeURIComponent(shareUrl.toString());

              const handleCopy = async () => {
                try {
                  await navigator.clipboard.writeText(shareUrl.toString());
                  alert("Link copied to clipboard");
                } catch (e) {
                  console.error("Copy failed", e);
                }
              };

              return (
                <>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#3650AD] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#2a3f8a] transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://wa.me/?text=${text}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-600 transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1DA1F2] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#1a8cd8] transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                  >
                    Twitter
                  </a>
                  <button
                    onClick={handleCopy}
                    className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                  >
                    Copy Link
                  </button>
                  <a
                    href={`mailto:?subject=${text}&body=${encodedUrl}`}
                    className="bg-[#F43676] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#d92d66] transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                  >
                    Email
                  </a>
                </>
              );
            })()}
          </div>
        </div>

        {/* Comments Section */}
        {petition && petition._id && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <CommentsSection petitionId={petition._id} />
          </div>
        )}

        {/* Login Modal */}
        <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
      </div>
    </div>
  );
}

