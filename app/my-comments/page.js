"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaSpinner, FaArrowLeft, FaComment } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function MyCommentsPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState({
        totalPages: 1,
        totalComments: 0,
        hasNextPage: false,
        hasPrevPage: false,
    });

    const ITEMS_PER_PAGE = 10;

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    // Fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            if (!user) return;

            setLoading(true);
            setError(null);

            try {
                const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                const userInfo = JSON.parse(localStorage.getItem("user"));

                if (!userInfo || !userInfo.token) {
                    router.push("/login");
                    return;
                }

                const response = await fetch(
                    `${backendUrl}/api/comments/user/all?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch comments");
                }

                const data = await response.json();
                setComments(data.comments || []);
                setPaginationInfo({
                    totalPages: data.totalPages || 1,
                    totalComments: data.totalComments || 0,
                    hasNextPage: data.hasNextPage || false,
                    hasPrevPage: data.hasPrevPage || false,
                });
            } catch (err) {
                console.error("Error fetching comments:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [user, currentPage, router]);

    // Handle page change
    const goToPage = (page) => {
        if (page >= 1 && page <= paginationInfo.totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
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

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-[#F43676]" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-[#f0f2f5] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            <FaArrowLeft className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-[#002050]">My Comments</h1>
                            <p className="text-gray-500 text-sm">
                                All your comments across petitions
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaComment className="text-[#F43676]" />
                            <span className="font-medium">{paginationInfo.totalComments}</span>
                            <span className="text-sm">Total Comments</span>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-white rounded-3xl p-10 shadow-sm flex items-center justify-center">
                        <FaSpinner className="animate-spin text-3xl text-[#F43676]" />
                        <span className="ml-3 text-gray-600">Loading comments...</span>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center">
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
                {!loading && !error && comments.length === 0 && (
                    <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-gray-100 rounded-full flex items-center justify-center">
                            <FaComment className="text-3xl text-[#F43676]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#002050] mb-2">No Comments Yet</h3>
                        <p className="text-gray-500 mb-6">
                            You haven&apos;t made any comments on petitions yet.
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-[#F43676] text-white font-medium rounded-full hover:bg-[#e02a60] transition-colors"
                        >
                            Browse Petitions
                        </Link>
                    </div>
                )}

                {/* Comments List */}
                {!loading && !error && comments.length > 0 && (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <Link
                                key={comment._id}
                                href={`/currentpetitions/${comment.petitionId}#comment-${comment._id}`}
                                className="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:ring-2 hover:ring-[#F43676]/20 group"
                            >
                                {/* Petition Title */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Commented on:
                                        </p>
                                        <h3 className="text-lg font-semibold text-[#002050] group-hover:text-[#F43676] transition-colors line-clamp-1">
                                            {comment.petitionTitle || "Unknown Petition"}
                                        </h3>
                                    </div>
                                    <FaChevronRight className="text-gray-400 group-hover:text-[#F43676] transition-colors mt-1" />
                                </div>

                                {/* Comment Content */}
                                <div className="bg-gray-50 rounded-xl p-4 mb-3">
                                    <p className="text-[#302d55] leading-relaxed">
                                        &ldquo;{comment.content}&rdquo;
                                    </p>
                                </div>

                                {/* Date */}
                                <p className="text-sm text-gray-400">
                                    {formatDate(comment.createdAt)}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && paginationInfo.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
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
                {!loading && !error && comments.length > 0 && (
                    <p className="text-center text-gray-500 text-sm mt-4">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                        {Math.min(currentPage * ITEMS_PER_PAGE, paginationInfo.totalComments)} of{" "}
                        {paginationInfo.totalComments} comments
                    </p>
                )}
            </div>
        </main>
    );
}
