"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman & Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function Banner() {
  const [selectedState, setSelectedState] = useState("Delhi");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [stats, setStats] = useState({
    totalSignatures: 0,
    totalUsers: 0,
    victories: 0,
    loading: true,
  });
  const dropdownRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const router = useRouter(); // Initialize useRouter

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/petitions/stats");
        if (response.ok) {
          const data = await response.json();
          setStats({
            totalSignatures: data.totalSignatures || 0,
            totalUsers: data.totalUsers || 0,
            victories: data.victories || 0,
            loading: false,
          });
        } else {
          // Fallback to demo data if API fails
          setStats({
            totalSignatures: 56182617,
            totalUsers: 45000,
            victories: 12,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Fallback to demo data
        setStats({
          totalSignatures: 56182617,
          totalUsers: 45000,
          victories: 12,
          loading: false,
        });
      }
    };

    fetchStats();
  }, []);

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(searchText)}`
      );
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-white py-12 px-4 flex flex-col items-center text-center">
      {/* Quote */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-gray-500 mb-2"
      >
        Be The Change,
        <br />
        You Want To See In The World.
      </motion.h1>

      {/* Author */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-teal-600 text-lg md:text-xl mb-4 font-medium"
      >
        — Mahatma Gandhi
      </motion.p>

      {/* Stats */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-700 text-sm md:text-base mb-6"
      >
        {stats.loading ? (
          <span className="animate-pulse">Loading statistics...</span>
        ) : (
          `${formatNumber(
            stats.totalSignatures
          )} signatures collected • ${formatNumber(
            stats.totalUsers
          )} people taking action • ${formatNumber(
            stats.victories
          )} victories achieved`
        )}
      </motion.p>

      {mounted && (
        <>
          {/* Campaign / Fundraising options */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 mb-6"
          >
            <button className="px-6 py-2 bg-[#3650AD] text-white rounded-full hover:bg-teal-600 transition">
              Campaign
            </button>
            <button className="px-6 py-2 bg-[#3650AD] text-white rounded-full hover:bg-teal-600 transition">
              Fundraising
            </button>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex w-full max-w-2xl border rounded-full shadow relative"
          >
            {/* Input */}
            <input
              type="text"
              placeholder="Search petitions..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 px-4 py-2 outline-none"
            />

            {/* Search button */}
            <button
              onClick={handleSearch} // Call handleSearch on click
              className="bg-[#3650AD] text-white px-6 py-2 rounded-r-full hover:bg-teal-600 transition"
            >
              Search
            </button>
          </motion.div>

          {/* Start a Petition button */}
          <Link href="/start-petition">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 bg-[#3650AD] text-white px-8 py-3 rounded-2xl shadow-lg hover:bg-teal-600 transition"
            >
              Start a Petition
            </motion.button>
          </Link>
        </>
      )}
    </section>
  );
}
