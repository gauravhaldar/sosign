"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { safeFetch } from "../utils/apiUtils";
import { Trophy, AlertTriangle } from "lucide-react";

// Static array for backward compatibility - this can be replaced with real data
export const successfulPetitions = [
  {
    id: 1,
    message: "Save Our Local Park from Development",
    signatures: 15000,
    location: "Mumbai, Maharashtra",
    starter: "Priya Sharma",
    started: "2023-01-15",
    image: "/images/park.jpg",
    creatorId: "user1",
    type: "successful",
  },
  {
    id: 2,
    message: "Better Healthcare for Rural Areas",
    signatures: 25000,
    location: "Bangalore, Karnataka",
    starter: "Dr. Ramesh Kumar",
    started: "2023-02-20",
    image: "/images/healthcare.jpg",
    creatorId: "user2",
    type: "successful",
  },
  {
    id: 3,
    message: "Stop Pollution in Our Rivers",
    signatures: 30000,
    location: "Delhi, NCR",
    starter: "Environmental Group",
    started: "2023-03-10",
    image: "/images/river.jpg",
    creatorId: "user3",
    type: "successful",
  },
];

// Custom hook for fetching successful petitions
export const useSuccessfulPetitions = (options = {}) => {
  const [successfulPetitions, setSuccessfulPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const {
    page = 1,
    limit = 10,
    category = "",
    location = "",
    sort = "newest",
  } = options;

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const fetchSuccessfulPetitions = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sort,
        });

        if (category) queryParams.append("category", category);
        if (location) queryParams.append("location", location);

        const data = await safeFetch(
          `/api/successful-petitions?${queryParams}`
        );

        if (!isMounted) return;

        if (data.success === false && data.rateLimited) {
          console.warn('Rate limit exceeded for successful petitions, using fallback');
          setSuccessfulPetitions([]);
          setLoading(false);
          return;
        }

        if (!isMounted) return;

        // Transform backend data to match frontend expectations
        const transformedPetitions =
          data.successfulPetitions?.map((petition) => {
            return {
              id: petition._id,
              name: petition.petitionStarterName,
              role: "Change Maker",
              message:
                petition.outcome || "Successfully achieved the petition goal!",
              image: petition.image || null, // Use null for proper conditional rendering
              slug: petition._id,
              signatures: petition.totalSignatures,
              decisionMakers:
                petition.decisionMakers?.map((dm) => dm.name) || [],
              issue: petition.issue,
              started: new Date(petition.startedDate)
                .toISOString()
                .split("T")[0],
              starter: petition.petitionStarterName,
              location: petition.location,
              petitionTitle: petition.petitionTitle,
              successDate: new Date(petition.successDate)
                .toISOString()
                .split("T")[0],
              category: petition.category || "Other",
              creatorId: petition.originalPetitionId,
            };
          }) || [];

        setSuccessfulPetitions(transformedPetitions);
        setPagination(data.pagination);
        setError(null);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        if (!isMounted) return;

        console.error("Error fetching successful petitions:", err);
        setError(err.message);
        setSuccessfulPetitions([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Add a small delay to prevent rapid successive calls
    timeoutId = setTimeout(fetchSuccessfulPetitions, 100);

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [page, limit, category, location, sort, retryCount]);

  return { successfulPetitions, loading, error, pagination };
};

// Component for displaying successful petitions
export default function SuccessfulPetitionsData({
  page = 1,
  limit = 6,
  category = "",
  location = "",
  sort = "newest",
  onPageChange = () => { },
}) {
  const { successfulPetitions, loading, error, pagination } =
    useSuccessfulPetitions({
      page,
      limit,
      category,
      location,
      sort,
    });

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Successful Petitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
              >
                <div className="bg-gray-300 h-48 w-full rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
                <div className="bg-gray-300 h-3 w-1/2 rounded mb-4"></div>
                <div className="bg-gray-300 h-20 w-full rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    // Fallback to static data if API fails
    const fallbackPetitions = successfulPetitions.map((petition) => ({
      id: petition.id,
      name: petition.starter,
      role: "Change Maker",
      message: petition.message,
      image: petition.image,
      slug: petition.id,
      signatures: petition.signatures,
      decisionMakers: [],
      issue: petition.message,
      started: petition.started,
      starter: petition.starter,
      location: petition.location,
      petitionTitle: petition.message,
      successDate: petition.started,
      category: "Other",
      creatorId: petition.creatorId,
    }));

    return (
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Successful Petitions
          </h2>

          {/* Error notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800 text-sm">
              Unable to load latest data. Showing sample successful petitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fallbackPetitions.map((petition) => (
              <Link
                key={petition.id}
                href={`/successfulpetitions/${petition.id}`}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                  {petition.image ? (
                    <div className="relative h-48">
                      <Image
                        src={petition.image}
                        alt={petition.petitionTitle}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Success
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-2">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-green-700 font-semibold">
                          Success Story
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Success
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {petition.petitionTitle}
                    </h3>

                    <div className="flex items-center mb-3">
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">
                          {petition.signatures.toLocaleString()}
                        </span>{" "}
                        signatures
                      </div>
                      <div className="mx-2 text-gray-400">•</div>
                      <div className="text-sm text-gray-600">
                        {petition.location}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {petition.issue}
                    </p>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {petition.starter}
                          </p>
                          <p className="text-xs text-gray-500">{petition.role}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          Started:{" "}
                          {new Date(petition.started).toLocaleDateString()}
                        </div>
                      </div>

                      {petition.category && (
                        <div className="mt-3">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {petition.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (successfulPetitions.length === 0) {
    return (
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Successful Petitions
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-600 text-lg">
              No successful petitions found
            </p>
            <p className="text-gray-500 mt-2">
              Be the first to create a successful petition!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Successful Petitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successfulPetitions.map((petition) => (
            <Link
              key={petition.id}
              href={`/successfulpetitions/${petition.id}`}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                {petition.image ? (
                  <div className="relative h-48">
                    <Image
                      src={petition.image}
                      alt={petition.petitionTitle}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Success
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-2">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-green-700 font-semibold">
                        Success Story
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Success
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {petition.petitionTitle}
                  </h3>

                  <div className="flex items-center mb-3">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">
                        {petition.signatures.toLocaleString()}
                      </span>{" "}
                      signatures
                    </div>
                    <div className="mx-2 text-gray-400">•</div>
                    <div className="text-sm text-gray-600">
                      {petition.location}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {petition.issue}
                  </p>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {petition.starter}
                        </p>
                        <p className="text-xs text-gray-500">{petition.role}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        Started:{" "}
                        {new Date(petition.started).toLocaleDateString()}
                      </div>
                    </div>

                    {petition.category && (
                      <div className="mt-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {petition.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <button
              onClick={() => pagination.hasPrev && onPageChange(page - 1)}
              disabled={!pagination.hasPrev}
              className={`px-4 py-2 rounded-lg transition-colors ${pagination.hasPrev
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Previous
            </button>

            <span className="text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              onClick={() => pagination.hasNext && onPageChange(page + 1)}
              disabled={!pagination.hasNext}
              className={`px-4 py-2 rounded-lg transition-colors ${pagination.hasNext
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
