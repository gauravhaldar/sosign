"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../components/LoginModal";
import { FaChevronRight, FaLink, FaShareAlt, FaTrash, FaTrophy, FaPlus } from "react-icons/fa";

const MyPetitionsPage = () => {
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [declareVictoryLoading, setDeclareVictoryLoading] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    const fetchMyPetitions = async () => {
      try {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("user"));

        if (!userInfo || !userInfo.token) {
          setError("User not authenticated.");
          setShowLoginModal(true);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/petitions/my-petitions", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPetitions(data.petitions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPetitions();
  }, [user, authLoading]);

  const copyToClipboard = (petitionSlug, petitionId) => {
    const url = `${window.location.origin}/currentpetitions/${petitionSlug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(petitionId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const sharePetition = (petition) => {
    if (navigator.share) {
      navigator.share({
        title: petition.title,
        text: petition.petitionDetails.problem.substring(0, 100) + "...",
        url: `${window.location.origin}/currentpetitions/${petition.slug}`,
      });
    } else {
      copyToClipboard(petition.slug, petition._id);
    }
  };

  const deletePetition = async (petitionId) => {
    if (window.confirm("Are you sure you want to delete this petition?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(`/api/petitions/${petitionId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (response.ok) {
          setPetitions(petitions.filter((p) => p._id !== petitionId));
        } else {
          alert("Failed to delete petition");
        }
      } catch (error) {
        alert("Error deleting petition");
      }
    }
  };

  const declareVictory = async (petitionId) => {
    const petition = petitions.find((p) => p._id === petitionId);
    if (!petition) {
      alert("Petition not found");
      return;
    }

    const confirmAction = window.confirm(
      "Are you sure you want to declare victory? This will move your petition to successful petitions and remove it from active petitions."
    );

    if (!confirmAction) return;

    try {
      setDeclareVictoryLoading(petitionId);

      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo || !userInfo.token) {
        alert("Please log in to declare victory");
        setDeclareVictoryLoading(null);
        return;
      }

      const successfulPetitionData = {
        petitionTitle: petition.title || "Untitled Petition",
        totalSignatures:
          petition.numberOfSignatures >= 0 ? petition.numberOfSignatures : 1,
        decisionMakers:
          petition.decisionMakers && petition.decisionMakers.length > 0
            ? petition.decisionMakers.map((dm) => ({
              name: dm.name || "Unknown Decision Maker",
              email: dm.email || "no-email@example.com",
              organization: dm.organization || "",
              phone: dm.phone || "",
            }))
            : [
              {
                name: "General Decision Makers",
                email: "contact@example.com",
                organization: "Government/Organization",
                phone: "",
              },
            ],
        issue:
          petition.petitionDetails?.problem || "No issue description provided",
        location: petition.country || "Location not specified",
        petitionStarterName: petition.petitionStarter?.name || "Anonymous",
        startedDate: petition.createdAt
          ? new Date(petition.createdAt).toISOString()
          : new Date().toISOString(),
        image: petition.petitionDetails?.image || null,
        originalPetitionId: petition._id,
        outcome: "Goal achieved through community support",
        category: "Other",
      };

      const requiredFields = [
        successfulPetitionData.petitionTitle,
        successfulPetitionData.totalSignatures,
        successfulPetitionData.decisionMakers,
        successfulPetitionData.issue,
        successfulPetitionData.location,
        successfulPetitionData.petitionStarterName,
      ];

      if (requiredFields.some((field) => !field)) {
        alert("Please ensure all required fields are filled.");
        return;
      }

      const successResponse = await fetch("/api/successful-petitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(successfulPetitionData),
      });

      if (!successResponse.ok) {
        const errorData = await successResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to create successful petition"
        );
      }

      const deleteResponse = await fetch(`/api/petitions/${petitionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!deleteResponse.ok) {
        console.warn(
          "Failed to delete original petition, but successful petition was created"
        );
      }

      setPetitions(petitions.filter((p) => p._id !== petitionId));

      alert(
        "🎉 Congratulations! Your petition has been declared successful and moved to the successful petitions section!"
      );
    } catch (error) {
      console.error("Error declaring victory:", error);
      alert(`Failed to declare victory: ${error.message}`);
    } finally {
      setDeclareVictoryLoading(null);
    }
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f0f2f5]">
        <div className="text-[#F43676] text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-[#f0f2f5]">
          <div className="bg-gradient-to-r from-[#fce4ec] to-[#f8bbd9] py-6 px-8 sm:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">My Petitions</h1>
              <nav className="flex items-center gap-2 text-sm text-[#1a1a2e]">
                <Link href="/" className="hover:text-[#F43676] transition-colors">Home</Link>
                <FaChevronRight className="text-xs text-gray-500" />
                <span className="text-[#1a1a2e] font-medium">My Petitions</span>
              </nav>
            </div>
          </div>
          <div className="flex items-center justify-center py-20">
            <p className="text-lg text-gray-600">Please login to view your petitions.</p>
          </div>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
      </>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f0f2f5]">
        <div className="text-[#F43676] text-lg font-medium">Loading petitions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center">
          <div className="text-center text-red-500 text-xl">Error: {error}</div>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f0f2f5]">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#fce4ec] to-[#f8bbd9] py-6 px-8 sm:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">My Petitions</h1>
            <nav className="flex items-center gap-2 text-sm text-[#1a1a2e]">
              <Link href="/" className="hover:text-[#F43676] transition-colors">Home</Link>
              <FaChevronRight className="text-xs text-gray-500" />
              <span className="text-[#1a1a2e] font-medium">My Petitions</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 sm:px-16 lg:px-24 py-10">
          <div className="max-w-4xl mx-auto">
            {/* Create New Petition Button */}
            <div className="flex justify-end mb-8">
              <Link href="/start-petition">
                <button className="flex items-center gap-2 bg-[#F43676] hover:bg-[#e02a60] text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                  <FaPlus />
                  Create New Petition
                </button>
              </Link>
            </div>

            {petitions.length === 0 ? (
              <div className="bg-white shadow-lg rounded-3xl p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#fce4ec] flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#F43676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">You haven&apos;t created any petitions yet.</p>
                <Link href="/start-petition">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#F43676] text-white rounded-xl font-medium hover:bg-[#e02a60] transition-colors">
                    Create Your First Petition
                    <FaChevronRight className="text-xs" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {petitions.map((petition) => (
                  <div
                    key={petition._id}
                    className="bg-white shadow-lg rounded-3xl overflow-hidden"
                  >
                    {/* Petition Header */}
                    <div className="p-6 sm:p-8 border-b border-gray-100">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] mb-3">
                        {petition.title}
                      </h2>
                      {/* Approval Status */}
                      <div>
                        {petition.approved ? (
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                            ✓ Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#fce4ec] text-[#F43676]">
                            ⏳ Pending Approval
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Petition Image */}
                    {petition.petitionDetails.image && (
                      <div className="px-6 sm:px-8 pt-6">
                        <div className="w-full h-64 relative rounded-2xl overflow-hidden">
                          <Image
                            src={petition.petitionDetails.image}
                            alt={petition.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="m-6 sm:m-8 bg-[#f0f2f5] rounded-2xl p-4">
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => copyToClipboard(petition.slug, petition._id)}
                          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${copiedId === petition._id
                              ? "bg-green-500 text-white"
                              : "bg-white text-gray-700 hover:bg-[#fce4ec] hover:text-[#F43676]"
                            }`}
                        >
                          <FaLink />
                          {copiedId === petition._id ? "Copied!" : "Copy Link"}
                        </button>
                        <button
                          onClick={() => sharePetition(petition)}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white text-gray-700 hover:bg-[#fce4ec] hover:text-[#F43676] py-3 px-4 rounded-xl font-medium transition-all"
                        >
                          <FaShareAlt />
                          Share
                        </button>
                        <button
                          onClick={() => deletePetition(petition._id)}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white text-red-500 hover:bg-red-50 py-3 px-4 rounded-xl font-medium transition-all"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Petition Overview */}
                    <div className="m-6 sm:m-8 mt-0 bg-[#f0f2f5] rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4 text-center">
                        Petition Overview
                      </h3>

                      {/* Signatures Display */}
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="w-36 h-20 border-4 border-[#F43676] rounded-t-full border-b-0 flex items-end justify-center bg-gradient-to-t from-[#fce4ec] to-transparent">
                            <div className="text-center pb-2">
                              <div className="text-3xl font-bold text-[#F43676]">
                                {petition.numberOfSignatures || 0}
                              </div>
                              <div className="text-xs text-gray-600 font-medium">
                                Signatures
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Declare Victory Box */}
                      <div className="bg-white border-2 border-[#fce4ec] rounded-2xl p-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          <span className="text-[#1a1a2e] font-medium">
                            Reached your goal?
                          </span>
                          <button
                            onClick={() => declareVictory(petition._id)}
                            disabled={declareVictoryLoading === petition._id}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${declareVictoryLoading === petition._id
                                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                                : "bg-[#F43676] hover:bg-[#e02a60] text-white shadow-lg hover:shadow-xl"
                              }`}
                          >
                            {declareVictoryLoading === petition._id ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              <>
                                <FaTrophy />
                                Declare Victory
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
    </>
  );
};

export default MyPetitionsPage;
