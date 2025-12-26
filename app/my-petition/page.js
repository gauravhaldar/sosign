"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight, FaPlus, FaLink, FaShare, FaTrash, FaTrophy } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../components/LoginModal";

const MyPetitionsPage = () => {
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [declareVictoryLoading, setDeclareVictoryLoading] = useState(null); // Track which petition is being processed
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Check if auth is still loading
    if (authLoading) {
      return;
    }

    // If user is not authenticated, show login modal
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

  const copyToClipboard = (petitionSlug) => {
    const url = `${window.location.origin}/currentpetitions/${petitionSlug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
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
      copyToClipboard(petition.slug);
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
          alert("Petition deleted successfully!");
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
      setDeclareVictoryLoading(petitionId); // Set loading state for this specific petition

      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo || !userInfo.token) {
        alert("Please log in to declare victory");
        setDeclareVictoryLoading(null);
        return;
      }

      // Prepare successful petition data
      const successfulPetitionData = {
        petitionTitle: petition.title || "Untitled Petition",
        totalSignatures:
          petition.numberOfSignatures >= 0 ? petition.numberOfSignatures : 1, // Ensure it's not 0
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
        category: "Other", // You might want to add category field to original petition model
      };

      // Validate required fields on frontend
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
      console.log(
        "- startedDate:",
        !!successfulPetitionData.startedDate,
        successfulPetitionData.startedDate
      );

      // Create successful petition entry
      const successResponse = await fetch("/api/successful-petitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(successfulPetitionData),
      }).catch((fetchError) => {
        console.error("Fetch error:", fetchError);
        throw new Error(`Network error: ${fetchError.message}`);
      });

      console.log("Response received:", {
        status: successResponse.status,
        statusText: successResponse.statusText,
        ok: successResponse.ok,
        url: successResponse.url,
      });

      if (!successResponse.ok) {
        console.error("Response status:", successResponse.status);
        console.error("Response statusText:", successResponse.statusText);
        console.error(
          "Response headers:",
          Object.fromEntries(successResponse.headers.entries())
        );

        let errorData = {};
        try {
          const responseText = await successResponse.text();
          console.error("Raw response text:", responseText);

          if (responseText) {
            try {
              errorData = JSON.parse(responseText);
            } catch (parseError) {
              console.error("Failed to parse response as JSON:", parseError);
              errorData = { message: `Server error: ${responseText}` };
            }
          } else {
            errorData = {
              message: `HTTP ${successResponse.status}: ${successResponse.statusText}`,
            };
          }
        } catch (textError) {
          console.error("Failed to read response text:", textError);
          errorData = {
            message: `HTTP ${successResponse.status}: ${successResponse.statusText}`,
          };
        }

        console.error("Processed error data:", errorData);
        throw new Error(
          errorData.message || "Failed to create successful petition"
        );
      }

      // Delete the original petition
      const deleteResponse = await fetch(`/api/petitions/${petitionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!deleteResponse.ok) {
        // If delete fails, we should probably remove the successful petition we just created
        // But for now, we'll just warn the user
        console.warn(
          "Failed to delete original petition, but successful petition was created"
        );
      }

      // Update local state
      setPetitions(petitions.filter((p) => p._id !== petitionId));

      alert(
        "🎉 Congratulations! Your petition has been declared successful and moved to the successful petitions section!"
      );
    } catch (error) {
      console.error("Error declaring victory:", error);
      alert(`Failed to declare victory: ${error.message}`);
    } finally {
      setDeclareVictoryLoading(null); // Reset loading state
    }
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    // Optionally redirect to home page if user cancels login
    // router.push('/');
  };

  // Show loading while auth is being checked
  if (authLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  // Show login modal if user is not authenticated
  if (!user) {
    return (
      <>
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold mb-4">My Petitions</h1>
          <p className="text-lg text-gray-600">
            Please login to view your petitions.
          </p>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
      </>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading petitions...
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="container mx-auto p-4 text-center text-red-500">
          Error: {error}
        </div>
        <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
      </>
    );
  }

  return (
    <>
      {/* Navigation Banner */}
      <div className="bg-pink-100 border-b border-pink-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1a1a2e]">My Petitions</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#F43676] transition-colors">
              Home
            </Link>
            <FaChevronRight className="text-gray-400 text-xs" />
            <span className="text-[#1a1a2e] font-medium">My Petitions</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-[#f0f2f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Create Button */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e]">Your Active Petitions</h2>
              <p className="text-gray-500 mt-1">Manage and track your petitions</p>
            </div>
            <Link href="/start-petition">
              <button className="bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2">
                <FaPlus />
                Create New Petition
              </button>
            </Link>
          </div>

          {petitions.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-[#F43676] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Petitions Yet</h3>
              <p className="text-gray-500 mb-6">
                You haven&apos;t created any petitions yet. Start making a difference today!
              </p>
              <Link href="/start-petition">
                <button className="bg-gradient-to-r from-[#F43676] to-[#e02a60] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Create Your First Petition
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {petitions.map((petition) => (
                <div
                  key={petition._id}
                  className="bg-white shadow-lg rounded-3xl overflow-hidden border border-pink-100 hover:shadow-xl transition-shadow duration-200"
                >
                  {/* Petition Title as Heading */}
                  <div className="p-6 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-white">
                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">
                      {petition.title}
                    </h2>
                    {/* Approval Status */}
                    <div className="flex items-center gap-2">
                      {petition.approved ? (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-200">
                          ✓ Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
                          ⏳ Pending Approval
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Petition Image */}
                  {petition.petitionDetails.image && (
                    <div className="px-6 pt-6">
                      <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-md">
                        <Image
                          src={petition.petitionDetails.image}
                          alt={petition.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons Section */}
                  <div className="m-6 bg-pink-50 border border-pink-100 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-700 mb-3">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => copyToClipboard(petition.slug)}
                        className="flex-1 min-w-[140px] bg-white hover:bg-pink-100 text-gray-700 font-semibold py-3 px-4 rounded-xl border border-pink-200 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
                      >
                        <FaLink className="text-[#F43676]" />
                        Copy Link
                      </button>
                      <button
                        onClick={() => sharePetition(petition)}
                        className="flex-1 min-w-[140px] bg-gradient-to-r from-[#F43676] to-[#e02a60] hover:shadow-lg text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
                      >
                        <FaShare />
                        Share
                      </button>
                      <button
                        onClick={() => deletePetition(petition._id)}
                        className="flex-1 min-w-[140px] bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 px-4 rounded-xl border border-red-200 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Petition Overview Section */}
                  <div className="m-6 bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 text-[#1a1a2e] flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F43676] rounded-full"></div>
                      Petition Overview
                    </h3>

                    {/* Signatures Display */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="w-40 h-20 border-4 border-[#F43676] rounded-t-full border-b-0 flex items-end justify-center bg-gradient-to-t from-pink-100 to-transparent">
                          <div className="text-center pb-2">
                            <div className="text-3xl font-bold text-[#F43676]">
                              {petition.numberOfSignatures || 0}
                            </div>
                            <div className="text-xs text-gray-600 font-semibold">
                              Signatures
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Goal Achievement Box */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-5">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="text-gray-700 font-bold text-lg">Reached your goal?</p>
                          <p className="text-gray-500 text-sm">Celebrate your success!</p>
                        </div>
                        <button
                          onClick={() => declareVictory(petition._id)}
                          disabled={declareVictoryLoading === petition._id}
                          className={`${declareVictoryLoading === petition._id
                              ? "bg-yellow-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg hover:scale-105"
                            } text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2`}
                        >
                          {declareVictoryLoading === petition._id ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
    </>
  );
};

export default MyPetitionsPage;
