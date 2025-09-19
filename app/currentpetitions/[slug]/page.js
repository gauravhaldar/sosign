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
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-6 lg:px-8 bg-white shadow-lg rounded-xl mt-8 mb-12">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 leading-tight">
        {petition.title}
      </h1>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16 h-[calc(100vh-200px)] overflow-hidden">
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-3/5 flex-shrink-0 aspect-video sticky top-0 md:h-full"
        >
          {petition.petitionDetails?.image ? (
            <Image
              src={petition.petitionDetails.image}
              alt={petition.title}
              width={1200}
              height={675}
              className="w-full h-full object-contain rounded-2xl shadow-xl border border-gray-200"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-2xl shadow-xl border border-gray-200 flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <p className="text-2xl mb-2">📋</p>
                <p className="text-lg">No Image Available</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Side - Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-2/5 flex flex-col gap-8 overflow-y-auto pr-4"
        >
          {/* Total Signatures */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-lg font-medium">Total Signatures</p>
            <p className="text-2xl font-bold">
              {petition.numberOfSignatures || 0}
            </p>
          </div>

          {/* Sign This Petition Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Sign this Petition</h2>

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
      <div className="mt-12 flex flex-col gap-8">
        {/* Decision Makers */}
        {petition.decisionMakers && petition.decisionMakers.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
            <p className="font-semibold">Decision Makers:</p>
            <p>
              {petition.decisionMakers.map((dm) => dm.name || dm).join(", ")}
            </p>
          </div>
        )}

        {/* Problem */}
        {petition.petitionDetails?.problem && (
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
            <p className="font-semibold">Problem:</p>
            <p>{petition.petitionDetails.problem}</p>
          </div>
        )}

        {/* Solution */}
        {petition.petitionDetails?.solution && (
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
            <p className="font-semibold">Solution:</p>
            <p>{petition.petitionDetails.solution}</p>
          </div>
        )}

        {/* Country */}
        {petition.country && (
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
            <p className="font-semibold">Country:</p>
            <p>{petition.country}</p>
          </div>
        )}

        {/* Petition Starter */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
          <p className="font-semibold">Petition Starter:</p>
          <p>
            {petition.petitionStarter?.user?.name ||
              petition.petitionStarter?.name ||
              "Anonymous"}
          </p>
          <p className="text-sm text-gray-600">
            {petition.petitionStarter?.user?.designation ||
              petition.petitionStarter?.designation ||
              "Citizen"}
          </p>
          {petition.petitionStarter?.user?.email && (
            <p className="text-sm text-gray-600">
              {petition.petitionStarter.user.email}
            </p>
          )}
        </div>

        {/* Video URL */}
        {petition.petitionDetails?.videoUrl && (
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
            <p className="font-semibold">Video:</p>
            <a
              href={petition.petitionDetails.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Watch Video
            </a>
          </div>
        )}

        {/* Petition Updates & Supporters */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col gap-3 text-gray-700">
          <p>Total Supporters: {petition.numberOfSignatures || 0}</p>
          <p>Started: {new Date(petition.createdAt).toLocaleDateString()}</p>
          <p>
            Last Updated: {new Date(petition.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Share This Petition */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start col-span-full">
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
                  className="bg-[#3650AD] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#2a3f8a] transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                >
                  Twitter
                </a>
                <button
                  onClick={handleCopy}
                  className="bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-400 transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                >
                  Copy Link
                </button>
                <a
                  href={`mailto:?subject=${text}&body=${encodedUrl}`}
                  className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-600 transition duration-300 transform hover:-translate-y-0.5 shadow-md"
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
        <div className="mt-12">
          <CommentsSection petitionId={petition._id} />
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
    </div>
  );
}
