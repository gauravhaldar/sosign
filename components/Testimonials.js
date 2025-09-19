"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useSuccessfulPetitions } from "./SuccessfulPetitionsData";
import Image from "next/image";

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(5);
  const {
    successfulPetitions: testimonials,
    loading,
    error,
  } = useSuccessfulPetitions({
    limit: 20, // Get more items for testimonials
    sort: "newest",
  });

  const handleLoadMore = () => {
    setVisibleCount(testimonials.length);
  };

  const handleReadLess = () => {
    setVisibleCount(5);
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-50 py-6 px-6">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
          Successful Petitions
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="bg-gray-300 h-36 md:h-48 w-full"></div>
              <div className="p-4 md:p-6">
                <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
                <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
                <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gray-50 py-6 px-6">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
          Successful Petitions
        </h2>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 mb-2">
            Error loading successful petitions
          </p>
          <p className="text-gray-600">{error}</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="bg-gray-50 py-6 px-6">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
          Successful Petitions
        </h2>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">No successful petitions found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-6 px-6">
      <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
        Successful Petitions
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {testimonials.slice(0, visibleCount).map((testimonial, index) => (
          <Link
            key={testimonial.id || index}
            href={`/successfulpetitions/${testimonial.id}`}
          >
            <motion.div
              key={testimonial.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full min-h-[350px]"
            >
              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.petitionTitle || testimonial.name}
                  width={500}
                  height={300}
                  className="w-full h-36 md:h-48 object-cover"
                />
              ) : (
                <div className="w-full h-36 md:h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🎉</div>
                    <div className="text-green-700 font-semibold text-sm">
                      Success
                    </div>
                  </div>
                </div>
              )}
              <div className="p-4 md:p-6 text-center">
                <p className="text-gray-700 text-sm md:text-base mb-2">
                  &quot;{testimonial.message}&quot;
                </p>
                <h3 className="font-semibold text-base md:text-lg text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  {testimonial.role}
                </p>
                {testimonial.location && (
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Location: {testimonial.location}
                  </p>
                )}
                {testimonial.signatures && (
                  <p className="text-xs md:text-sm text-green-600 mt-1 font-semibold">
                    {testimonial.signatures.toLocaleString()} signatures
                  </p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        {visibleCount < testimonials.length && (
          <button
            onClick={handleLoadMore}
            className="bg-[#3650AD] text-white px-6 py-2 rounded-full font-medium hover:bg-teal-600 transition"
          >
            Load More
          </button>
        )}
        {visibleCount === testimonials.length && testimonials.length > 5 && (
          <button
            onClick={handleReadLess}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-400 transition"
          >
            Read Less
          </button>
        )}
      </div>
    </section>
  );
}
