"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Achievements() {
  const [stats, setStats] = useState({
    totalSignatures: 0,
    totalPetitions: 0,
    victories: 0,
    loading: true,
  });

  // Function to format numbers with appropriate suffixes
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M+";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K+";
    }
    return num.toString() + "+";
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
            totalPetitions: data.totalPetitions || 0,
            victories: data.victories || 0,
            loading: false,
          });
        } else {
          // Fallback to demo data if API fails
          setStats({
            totalSignatures: 874562892,
            totalPetitions: 654,
            victories: 24,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Fallback to demo data
        setStats({
          totalSignatures: 874562892,
          totalPetitions: 654,
          victories: 24,
          loading: false,
        });
      }
    };

    fetchStats();
  }, []);
  const achievementStats = [
    {
      number: stats.loading ? "..." : formatNumber(stats.totalSignatures),
      label: "Signatures",
      loading: stats.loading,
    },
    {
      number: stats.loading ? "..." : formatNumber(stats.totalPetitions),
      label: "Petitions",
      loading: stats.loading,
    },
    {
      number: stats.loading ? "..." : formatNumber(stats.victories),
      label: "Victories",
      loading: stats.loading,
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-6 text-center">
      <h2 className="text-2xl md:text-3xl font-medium mb-10 text-gray-500">
        We Make a Difference
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        {achievementStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full border-4 border-teal-600 shadow-lg bg-white">
              <span
                className={`text-xl md:text-2xl font-bold text-blue-800 ${
                  stat.loading ? "animate-pulse" : ""
                }`}
              >
                {stat.number}
              </span>
            </div>
            <p className="mt-3 text-gray-600 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
