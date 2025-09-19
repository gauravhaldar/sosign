"use client";

import { useState } from 'react';
import SuccessfulPetitionsData from "../../components/SuccessfulPetitionsData";

export default function SuccessfulPetitionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    sort: 'newest'
  });

  // Reset page when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
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
            <div className="flex flex-wrap gap-4">
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

              {/* Location Filter */}
              <input
                type="text"
                placeholder="Filter by location..."
                value={filters.location}
                onChange={(e) => handleFilterChange({ ...filters, location: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
