"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Petitions</h1>
          <Link href="/start-petition">
            <button className="bg-blue-500 hover:bg-[#3650AD] text-white font-bold py-2 px-4 rounded">
              Create New Petition
            </button>
          </Link>
        </div>

        {petitions.length === 0 ? (
          <p className="text-center text-lg">
            You haven&apos;t created any petitions yet.
          </p>
        ) : (
          <div className="space-y-8">
            {petitions.map((petition) => (
              <div
                key={petition._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Petition Title as Heading */}
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {petition.title}
                  </h2>
                  {/* Approval Status */}
                  <div className="mt-2">
                    {petition.approved ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✓ Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⏳ Pending Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* Petition Image */}
                {petition.petitionDetails.image && (
                  <div className="px-6 pt-4">
                    <div className="w-full h-64 relative rounded-lg overflow-hidden">
                      <Image
                        src={petition.petitionDetails.image}
                        alt={petition.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons Section - Separate Box */}
                <div className="m-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex gap-4">
                    <button
                      onClick={() => copyToClipboard(petition.slug)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={() => sharePetition(petition)}
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded transition-colors"
                    >
                      Share
                    </button>
                    <button
                      onClick={() => deletePetition(petition._id)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded transition-colors"
                    >
                      Delete Petition
                    </button>
                  </div>
                </div>

                {/* Petition Overview Section - Separate Box */}
                <div className="m-6 bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Petition Overview
                  </h3>

                  {/* Semi-circle design with signatures */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-32 h-16 border-4 border-green-500 rounded-t-full border-b-0 flex items-end justify-center bg-gradient-to-t from-green-50 to-transparent">
                        <div className="text-center pb-2">
                          <div className="text-2xl font-bold text-green-600">
                            {petition.numberOfSignatures || 0}
                          </div>
                          <div className="text-xs text-gray-600">
                            Signatures
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Goal Achievement Box */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">
                        Reached your goal?
                      </span>
                      <button
                        onClick={() => declareVictory(petition._id)}
                        disabled={declareVictoryLoading === petition._id}
                        className={`${
                          declareVictoryLoading === petition._id
                            ? "bg-yellow-400 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        } text-white font-bold py-2 px-4 rounded transition-colors`}
                      >
                        {declareVictoryLoading === petition._id ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          "Declare Victory"
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

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
    </>
  );
};

export default MyPetitionsPage;
