"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recent petitions on component mount
  useEffect(() => {
    const fetchRecentPetitions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/petitions?limit=4&sort=recent');
        
        if (!response.ok) {
          if (response.status === 429) {
            console.warn('Rate limit exceeded, using fallback data');
            // Use fallback data or show cached data
            setPetitions([]);
            setLoading(false);
            return;
          }
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match the expected format
        const transformedPetitions = data.petitions?.map(petition => ({
          id: petition._id,
          title: petition.title,
          author: petition.author?.name || petition.author || 'Anonymous',
          supporters: (petition.numberOfSignatures || 0).toLocaleString(),
          image: petition.petitionDetails?.image || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
          slug: petition.slug
        })) || [];
        
        setPetitions(transformedPetitions);
        setError(null);
      } catch (err) {
        console.error('Error fetching petitions:', err);
        setError(err.message);
        // Fallback to empty array if fetch fails
        setPetitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPetitions();
  }, []);

  // Auto slide every 6 seconds (only if there are petitions)
  useEffect(() => {
    if (petitions.length === 0) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % petitions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [petitions.length]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + petitions.length) % petitions.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % petitions.length);
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            Latest Petitions
          </h2>
          <div className="relative h-72 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg mx-auto p-8">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-40 w-full rounded mb-4"></div>
                <div className="bg-gray-300 h-4 w-3/4 mx-auto rounded mb-2"></div>
                <div className="bg-gray-300 h-3 w-1/2 mx-auto rounded mb-1"></div>
                <div className="bg-gray-300 h-3 w-1/3 mx-auto rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            Latest Petitions
          </h2>
          <div className="relative h-72 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg mx-auto p-8">
              <p className="text-red-500 text-lg">Error loading petitions</p>
              <p className="text-gray-600 text-sm mt-2">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No petitions state
  if (petitions.length === 0) {
    return (
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            Latest Petitions
          </h2>
          <div className="relative h-72 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg mx-auto p-8">
              <p className="text-gray-600 text-lg">No petitions available at the moment</p>
              <p className="text-gray-500 text-sm mt-2">Be the first to create a petition!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center relative">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
          Latest Petitions
        </h2>

        {/* Slide Container */}
        <div className="relative h-72 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <Link href={`/currentpetitions/${petitions[index].slug}`}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-2xl w-full max-w-lg mx-auto overflow-hidden cursor-pointer"
              >
                <Image
                  src={petitions[index].image}
                  alt={petitions[index].title}
                  width={800}
                  height={400}
                  className="h-40 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800">
                    {petitions[index].title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Started by{" "}
                    <span className="font-medium">{petitions[index].author}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {petitions[index].supporters} supporters
                  </p>
                </div>
              </motion.div>
            </Link>
          </AnimatePresence>

          {/* Left Arrow - Only show if more than 1 petition */}
          {petitions.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
          )}

          {/* Right Arrow - Only show if more than 1 petition */}
          {petitions.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Dots Navigation - Only show if more than 1 petition */}
        {petitions.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {petitions.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
