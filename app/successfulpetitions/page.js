"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaSpinner, FaChevronRight } from 'react-icons/fa';
import SuccessfulPetitionsData from "../../components/SuccessfulPetitionsData";

export default function SuccessfulPetitionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    sort: 'newest'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Reset page when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // For now, just close suggestions - full search filtering can be added later
    setShowSuggestions(false);
  };

  // Fetch search suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSearchSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setSuggestionsLoading(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
        const response = await fetch(
          `${backendUrl}/api/successful-petitions?search=${encodeURIComponent(searchQuery)}&limit=5`
        );

        if (response.ok) {
          const data = await response.json();
          setSearchSuggestions(data.successfulPetitions || []);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setSuggestionsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = (petitionId) => {
    setShowSuggestions(false);
    setSearchQuery("");
    router.push(`/successfulpetitions/${petitionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4">
            Successful Petitions
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Celebrate the victories! These petitions have successfully achieved their goals and made a real difference in communities around the world.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 flex-1">
              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange({ ...filters, category: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Environment">Environment</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Social Justice">Social Justice</option>
                <option value="Politics">Politics</option>
                <option value="Animal Rights">Animal Rights</option>
                <option value="Human Rights">Human Rights</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
              </select>

              {/* Search with Suggestions */}
              <div ref={searchRef} className="relative flex-1 min-w-[250px]">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F43676] text-white rounded-r-lg hover:bg-[#e02a60] transition-colors"
                  >
                    <FaSearch />
                  </button>
                </form>

                {/* Suggestions Dropdown */}
                {showSuggestions && (searchSuggestions.length > 0 || suggestionsLoading) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {suggestionsLoading ? (
                      <div className="px-4 py-3 text-center text-gray-500">
                        <FaSpinner className="animate-spin inline mr-2" />
                        Searching...
                      </div>
                    ) : (
                      searchSuggestions.map((petition) => (
                        <button
                          key={petition._id}
                          type="button"
                          onClick={() => handleSuggestionClick(petition._id)}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 border-b border-gray-100 last:border-b-0 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            {petition.image && (
                              <img
                                src={petition.image}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors line-clamp-1">
                                {petition.petitionTitle}
                              </p>
                              <p className="text-xs text-gray-500">
                                {petition.location} • {petition.totalSignatures?.toLocaleString() || 0} signatures
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Success</span>
                              <FaChevronRight className="text-gray-400 group-hover:text-green-600" />
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                    {!suggestionsLoading && searchSuggestions.length > 0 && (
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full px-4 py-2 text-center text-sm text-[#F43676] hover:bg-pink-50 font-medium transition-colors"
                      >
                        See all results for &quot;{searchQuery}&quot;
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sort Options */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange({ ...filters, sort: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="signatures">Most Signatures</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Successful Petitions Component */}
      <SuccessfulPetitionsData
        page={currentPage}
        limit={12}
        category={filters.category}
        location={filters.location}
        sort={filters.sort}
        onPageChange={setCurrentPage}
      />

      {/* Statistics Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Impact Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">Success</div>
              <div className="text-gray-600">Petitions Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Change</div>
              <div className="text-gray-600">Real World Impact</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">Community</div>
              <div className="text-gray-600">People Empowered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">Hope</div>
              <div className="text-gray-600">For the Future</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

