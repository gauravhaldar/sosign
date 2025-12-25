"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaComment, FaPause, FaPlay } from "react-icons/fa";
import config from "@/config/api";

// Default fallback data in case API fails or returns empty
const defaultHeroSlides = [
  {
    id: "default-1",
    image: "https://picsum.photos/seed/hero1/800/600",
    categories: ["Environment", "Social"],
    title: "Join the Movement to Protect Our Planet",
    description: "Be part of the change. Every signature counts towards creating a better future for our environment and communities. Together we can make a difference.",
    date: "December 24, 2024",
    comments: "0 Comments",
    link: "/currentpetitions",
  },
];

const defaultTopStories = [
  {
    id: "default-story-1",
    title: "Start your own petition today",
    date: "Today",
    image: "https://picsum.photos/seed/story1/100/100",
  },
];

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to extract categories from petition (based on country or keywords)
const extractCategories = (petition) => {
  const categories = [];
  
  // Add country as a category
  if (petition.country) {
    categories.push(petition.country);
  }
  
  // Try to extract category from title or problem description
  const text = `${petition.title} ${petition.petitionDetails?.problem || ""}`.toLowerCase();
  
  if (text.includes("environment") || text.includes("climate") || text.includes("pollution")) {
    categories.push("Environment");
  } else if (text.includes("health") || text.includes("medical") || text.includes("hospital")) {
    categories.push("Healthcare");
  } else if (text.includes("education") || text.includes("school") || text.includes("student")) {
    categories.push("Education");
  } else if (text.includes("social") || text.includes("community") || text.includes("society")) {
    categories.push("Community");
  } else {
    categories.push("Social");
  }
  
  return categories.slice(0, 2); // Return max 2 categories
};

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides);
  const [topStories, setTopStories] = useState(defaultTopStories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch petitions from the backend
  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_BASE_URL}/api/petitions?limit=10`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch petitions");
        }
        
        const data = await response.json();
        
        if (data.petitions && data.petitions.length > 0) {
          // Transform petitions into hero slides format
          const slides = data.petitions.map((petition) => ({
            id: petition._id,
            image: petition.petitionDetails?.image || `https://picsum.photos/seed/${petition._id}/800/600`,
            categories: extractCategories(petition),
            title: petition.title,
            description: petition.petitionDetails?.problem || petition.petitionDetails?.solution || "Support this important cause by signing the petition.",
            date: formatDate(petition.createdAt),
            comments: `${petition.numberOfSignatures || 0} Signatures`,
            link: `/petitions/${petition._id}`,
          }));
          
          setHeroSlides(slides);
          
          // Transform petitions into top stories format
          const stories = data.petitions.map((petition) => ({
            id: petition._id,
            title: petition.title.length > 40 ? petition.title.substring(0, 40) + "..." : petition.title,
            date: formatDate(petition.createdAt),
            image: petition.petitionDetails?.image || `https://picsum.photos/seed/${petition._id}/100/100`,
          }));
          
          setTopStories(stories);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching petitions:", err);
        setError(err.message);
        // Keep default data on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchPetitions();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (heroSlides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  if (!mounted) return null;

  return (
    <section className="bg-[#f0f2f5] mt px-8 sm:px-16 lg:px-24 pt-6">
      {/* Top Stories Ticker Bar */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden flex items-stretch">
        {/* Top Stories Label */}
        <div className="flex items-center gap-2 bg-[#F43676] text-white px-5 shrink-0">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <span className="font-bold text-sm">Top Stories</span>
        </div>

        {/* Scrolling News Ticker */}
        <div className="flex-1 overflow-hidden relative py-3 px-4">
          <motion.div
            className="flex gap-8 items-center"
            animate={isTickerPaused ? {} : { x: [0, -1500] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...topStories, ...topStories, ...topStories].map((story, index) => (
              <Link
                key={`${story.id}-${index}`}
                href="/currentpetitions"
                className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 shrink-0">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-bold text-sm whitespace-nowrap">
                    {story.title}
                  </span>
                  <span className="text-gray-500 font-semibold text-xs flex items-center gap-1">
                    <span className="text-[#F43676]">•</span> {story.date}
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={() => setIsTickerPaused(!isTickerPaused)}
          className="w-10 bg-[#2D3A8C] text-white flex items-center justify-center hover:bg-[#1e2a6c] transition-colors shrink-0"
        >
          {isTickerPaused ? <FaPlay className="text-xs" /> : <FaPause className="text-xs" />}
        </button>
      </div>

      {/* Hero Slider Section */}
      <div className="py-6">
        <div className="relative bg-white rounded-3xl shadow-lg overflow-visible p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left Side - Image */}
            <div className="lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl group lg:-ml-14 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${heroSlides[currentSlide].image}')`,
                      backgroundColor: '#e5e7eb'
                    }}
                  >
                    {/* Fallback gradient if image doesn't exist */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center opacity-0 hover:opacity-0">
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Left Navigation Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10 border border-gray-100"
              >
                <FaChevronLeft className="text-gray-600 text-sm" />
              </button>
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* Category Tags */}
                  <div className="flex gap-3 mb-5">
                    {heroSlides[currentSlide].categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-4 py-1.5 bg-[#F43676]/10 text-[#F43676] rounded-full text-sm font-medium hover:bg-[#F43676]/20 transition-colors cursor-pointer"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-4 leading-tight">
                    {heroSlides[currentSlide].title}
                  </h1>

                  {/* Description */}
                  <p className="text-gray-500 text-base mb-6 leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>

                  {/* Continue Reading Link */}
                  <Link
                    href={heroSlides[currentSlide].link}
                    className="inline-flex items-center gap-2 text-gray-800 font-semibold hover:text-[#F43676] transition-colors mb-6 group"
                  >
                    Continue Reading
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Date and Comments */}
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      {heroSlides[currentSlide].date}
                    </span>
                    <span className="text-[#F43676]">•</span>
                    <span className="flex items-center gap-2">
                      <FaComment className="text-gray-400" />
                      {heroSlides[currentSlide].comments}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Navigation Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10 border border-gray-100"
            >
              <FaChevronRight className="text-gray-600 text-sm" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
