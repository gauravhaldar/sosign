"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt, FaPlay, FaChevronRight, FaChevronLeft, FaSpinner, FaPen, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import ProfileEditModal from "./ProfileEditModal";

// Categories mapping for display labels
const categoryLabels = {
  animals: "Animals",
  game: "Game",
  interior: "Interior",
  lifestyle: "Lifestyle",
  sports: "Sports",
  technology: "Technology",
  travel: "Travel",
  environment: "Environment",
  education: "Education",
  health: "Health",
  politics: "Politics",
  human_rights: "Human Rights",
};

// All categories for sidebar
const allCategories = [
  "Animals",
  "Game",
  "Interior",
  "Lifestyle",
  "Sports",
  "Technology",
  "Travel",
  "Environment",
  "Education",
  "Health",
  "Politics",
  "Human Rights",
];


// Tags - mapped to categories
const tags = [
  "Animals",
  "Environment",
  "Education",
  "Health",
  "Politics",
  "Human Rights",
  "Sports",
  "Technology",
  "Travel",
  "Lifestyle",
];

export default function Content() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalPetitions: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [ads, setAds] = useState([]);
  const [adsLoading, setAdsLoading] = useState(true);
  const { user } = useAuth();

  const ITEMS_PER_PAGE = 6;

  // Fetch petitions from API
  useEffect(() => {
    const fetchPetitions = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
        const response = await fetch(
          `${backendUrl}/api/petitions?page=${currentPage}&limit=${ITEMS_PER_PAGE}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch petitions");
        }

        const data = await response.json();
        setPetitions(data.petitions || []);
        setPaginationInfo({
          totalPages: data.totalPages || 1,
          totalPetitions: data.totalPetitions || 0,
          hasNextPage: data.hasNextPage || false,
          hasPrevPage: data.hasPrevPage || false,
        });

        // Set recent posts from the first 4 petitions
        if (data.petitions && data.petitions.length > 0) {
          setRecentPosts(data.petitions.slice(0, 4).map(p => ({
            title: p.title,
            slug: p._id,
          })));
        }
      } catch (err) {
        console.error("Error fetching petitions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPetitions();
  }, [currentPage, searchQuery]);

  // Fetch recent comments from the logged-in user
  useEffect(() => {
    const fetchRecentComments = async () => {
      if (!user) {
        setRecentComments([]);
        return;
      }

      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
        const userInfo = JSON.parse(localStorage.getItem("user"));

        if (!userInfo || !userInfo.token) {
          setRecentComments([]);
          return;
        }

        const response = await fetch(
          `${backendUrl}/api/comments/user/recent?limit=4`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRecentComments(data.comments || []);
        } else {
          setRecentComments([]);
        }
      } catch (err) {
        console.error("Error fetching recent comments:", err);
        setRecentComments([]);
      }
    };

    fetchRecentComments();
  }, [user]);

  // Fetch active ads
  useEffect(() => {
    const fetchAds = async () => {
      setAdsLoading(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${backendUrl}/api/ads/active?position=sidebar`);

        if (response.ok) {
          const data = await response.json();
          setAds(data.ads || []);
        } else {
          setAds([]);
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
        setAds([]);
      } finally {
        setAdsLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= paginationInfo.totalPages) {
      setCurrentPage(page);
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get category label
  const getCategoryLabel = (category) => {
    return categoryLabels[category] || category;
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    const total = paginationInfo.totalPages;
    const current = currentPage;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }

    return pages;
  };

  return (
    <>
      <section className="bg-[#f0f2f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:w-2/3">
              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <FaSpinner className="animate-spin text-4xl text-[#F43676]" />
                  <span className="ml-3 text-lg text-gray-600">Loading petitions...</span>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                  <p className="text-red-600 mb-4">Error: {error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-[#F43676] text-white rounded-lg hover:bg-[#e02a60] transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && petitions.length === 0 && (
                <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
                  <h3 className="text-xl font-bold text-[#002050] mb-2">No petitions found</h3>
                  <p className="text-[#302d55]">
                    {searchQuery
                      ? `No results for "${searchQuery}". Try a different search term.`
                      : "There are no active petitions at the moment."}
                  </p>
                </div>
              )}

              {/* Petitions List */}
              {!loading && !error && petitions.length > 0 && (
                <div className="space-y-6">
                  {petitions.map((petition, index) => (
                    <div
                      key={petition._id}
                      className={`relative bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow ${index === 0 ? "ring-2 ring-[#F43676]" : ""
                        }`}
                    >
                      <Link
                        href={`/currentpetitions/${petition._id}`}
                        className="flex flex-col sm:flex-row items-center"
                      >
                        {/* Image - Extended outside */}
                        <div className="sm:w-2/5 relative sm:-ml-6 my-4 sm:my-6">
                          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                            <img
                              src={
                                petition.petitionDetails?.image ||
                                `https://picsum.photos/seed/${petition._id}/500/400`
                              }
                              alt={petition.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Feature/Video Icon */}
                          {index === 0 && (
                            <div className="absolute top-4 right-4 w-10 h-10 bg-[#F43676] rounded-full flex items-center justify-center shadow-md">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          )}
                          {petition.petitionDetails?.videoUrl && index !== 0 && (
                            <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                              <FaPlay className="text-white text-sm ml-0.5" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="sm:w-3/5 p-6">
                          {/* Category Tags - Show ALL categories */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {petition.categories && petition.categories.length > 0 ? (
                              petition.categories.map((category, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-[#fce4ec] text-[#F43676] rounded-full text-xs font-medium"
                                >
                                  {getCategoryLabel(category)}
                                </span>
                              ))
                            ) : (
                              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                                Uncategorized
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-[#002050] mb-3 leading-tight hover:text-[#F43676] transition-colors">
                            {petition.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[#302d55] text-sm mb-4 leading-relaxed line-clamp-2">
                            {petition.petitionDetails?.problem?.substring(0, 150)}
                            {petition.petitionDetails?.problem?.length > 150 ? "..." : ""}
                          </p>

                          {/* Author Info */}
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img
                                src={
                                  petition.petitionStarter?.user?.profilePicture ||
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(petition.petitionStarter?.name || "Anonymous")}&background=random&size=32`
                                }
                                alt={petition.petitionStarter?.name || "Anonymous"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-[#302d55] font-medium">
                              {petition.petitionStarter?.name || "Anonymous"}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="flex items-center gap-1 text-gray-400">
                              <FaCalendarAlt className="text-xs" />
                              {formatDate(petition.createdAt)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && !error && paginationInfo.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={!paginationInfo.hasPrevPage}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${paginationInfo.hasPrevPage
                      ? "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed border-gray-100"
                      }`}
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>

                  {/* Page Numbers */}
                  {getPaginationNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === "number" && goToPage(page)}
                      disabled={page === "..."}
                      className={`w-10 h-10 rounded-full font-medium flex items-center justify-center transition-colors ${page === currentPage
                        ? "bg-[#F43676] text-white"
                        : page === "..."
                          ? "bg-transparent text-gray-400 cursor-default"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={!paginationInfo.hasNextPage}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${paginationInfo.hasNextPage
                      ? "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed border-gray-100"
                      }`}
                  >
                    <FaChevronRight className="text-sm" />
                  </button>
                </div>
              )}

              {/* Results Info */}
              {!loading && !error && petitions.length > 0 && (
                <p className="text-center text-gray-500 text-sm mt-4">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, paginationInfo.totalPetitions)} of{" "}
                  {paginationInfo.totalPetitions} petitions
                </p>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:w-1/3 space-y-6">
              {/* Search Box */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-[#002050]">Search</h3>
                  <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                </div>
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    placeholder="Search petitions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-l-lg outline-none focus:border-[#F43676] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#F43676] text-white rounded-r-lg hover:bg-[#e02a60] transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Recent Comments */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-[#002050]">Recent Comments</h3>
                  <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                </div>
                {user ? (
                  recentComments.length > 0 ? (
                    <ul className="space-y-3">
                      {recentComments.map((comment, index) => (
                        <li key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                          <Link
                            href={`/currentpetitions/${comment.petitionId}`}
                            className="block hover:bg-pink-50 p-2 rounded-lg transition-colors group"
                          >
                            {/* Petition Title */}
                            {comment.petitionTitle && (
                              <p className="text-xs text-gray-500 mb-1">
                                <span className="font-medium">On:</span>{" "}
                                <span className="text-[#F43676] group-hover:underline line-clamp-1">
                                  {comment.petitionTitle}
                                </span>
                              </p>
                            )}
                            {/* Comment Content */}
                            <p className="text-[#302d55] text-sm leading-relaxed line-clamp-2 mb-1">
                              &ldquo;{comment.content}&rdquo;
                            </p>
                            {/* Date */}
                            <p className="text-xs text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#302d55] text-sm">You haven&apos;t made any comments yet.</p>
                  )
                ) : (
                  <p className="text-[#302d55] text-sm">
                    <Link href="/login" className="text-[#F43676] hover:underline">
                      Login
                    </Link> to see your recent comments.
                  </p>
                )}
              </div>

              {/* Archives */}
              {/* <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">Archives</h3>
                <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
              </div>
              <p className="text-gray-600">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div> */}

              {/* Categories */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-[#002050]">Categories</h3>
                  <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                </div>
                <ul className="space-y-3">
                  {allCategories.map((category, index) => (
                    <li key={index} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <Link
                        href={`/category/${category.toLowerCase().replace(" ", "_")}`}
                        className="text-[#302d55] hover:text-[#F43676] transition-colors"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-[#002050]">Recent Petitions</h3>
                  <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                </div>
                <ul className="space-y-3">
                  {recentPosts.length > 0 ? (
                    recentPosts.map((post, index) => (
                      <li key={index} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                        <Link
                          href={`/currentpetitions/${post.slug}`}
                          className="text-[#302d55] hover:text-[#F43676] transition-colors text-sm leading-relaxed block"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-[#302d55] text-sm">No recent posts</li>
                  )}
                </ul>
              </div>

              {/* Author Card */}
              {user ? (
                <div className="bg-white rounded-3xl p-6 shadow-sm text-center relative">
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#F43676] hover:text-white transition-colors text-gray-600"
                    title="Edit Profile"
                  >
                    <FaPen className="text-xs" />
                  </button>
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-100">
                    <img
                      src={
                        user.profilePicture ||
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=random&size=200`
                      }
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-[#002050] mb-2">{user.name}</h4>
                  {user.designation && (
                    <p className="text-[#F43676] text-sm font-medium mb-2">{user.designation}</p>
                  )}
                  <p className="text-[#302d55] text-sm leading-relaxed mb-4">
                    {user.bio || "Click the edit button to add your bio and tell others about yourself!"}
                  </p>

                  {/* Social Media Icons */}
                  {user.socialLinks && Object.values(user.socialLinks).some(link => link) && (
                    <div className="flex items-center justify-center gap-2 pt-2">
                      {user.socialLinks.facebook && (
                        <a
                          href={user.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        >
                          <FaFacebookF className="text-sm" />
                        </a>
                      )}
                      {user.socialLinks.twitter && (
                        <a
                          href={user.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        >
                          <FaXTwitter className="text-sm" />
                        </a>
                      )}
                      {user.socialLinks.instagram && (
                        <a
                          href={user.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        >
                          <FaInstagram className="text-sm" />
                        </a>
                      )}
                      {user.socialLinks.linkedin && (
                        <a
                          href={user.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        >
                          <FaLinkedinIn className="text-sm" />
                        </a>
                      )}
                      {user.socialLinks.youtube && (
                        <a
                          href={user.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        >
                          <FaYoutube className="text-sm" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-100 bg-gradient-to-br from-pink-100 to-gray-100 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#002050] mb-2">Welcome!</h4>
                  <p className="text-[#302d55] text-sm leading-relaxed mb-4">
                    Sign in to customize your profile and join the community.
                  </p>
                  <Link
                    href="/login"
                    className="inline-block px-6 py-2 bg-[#F43676] text-white font-medium rounded-full hover:bg-[#e02a60] transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              {/* Tags */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-[#002050]">Tags</h3>
                  <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => {
                    // Convert tag to category slug (lowercase with underscores for spaces)
                    const categorySlug = tag.toLowerCase().replace(/\s+/g, '_');
                    return (
                      <Link
                        key={index}
                        href={`/category/${categorySlug}`}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-[#302d55] hover:border-[#F43676] hover:text-[#F43676] transition-colors"
                      >
                        {tag}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Ads */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-[#002050]">Ads</h3>
                  <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                </div>

                {adsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <FaSpinner className="animate-spin text-2xl text-[#F43676]" />
                  </div>
                ) : ads.length > 0 ? (
                  <div className="space-y-4">
                    {ads.map((ad, index) => (
                      <a
                        key={ad._id || index}
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                        onClick={async () => {
                          try {
                            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                            await fetch(`${backendUrl}/api/ads/${ad._id}/click`, { method: "POST" });
                          } catch (err) {
                            console.error("Error tracking click:", err);
                          }
                        }}
                      >
                        <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <img
                            src={ad.image || ad.imageUrl}
                            alt={ad.title || "Advertisement"}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                        <div className="mt-3">
                          <h4 className="font-semibold text-[#1a1a2e] group-hover:text-[#F43676] transition-colors line-clamp-1">
                            {ad.title}
                          </h4>
                          {ad.description && (
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                              {ad.description}
                            </p>
                          )}
                        </div>
                        {index < ads.length - 1 && (
                          <div className="border-b border-gray-100 mt-4"></div>
                        )}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <p className="text-sm">No ads available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}
