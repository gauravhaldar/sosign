"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { safeFetch } from "../utils/apiUtils";

// Export petitions array
export const petitions = [
  {
    name: "Aarav Kumar",
    role: "Student",
    message:
      "We are demanding safer roads near our schools. Every voice matters!",
    image:
      "https://web.archive.org/web/20160331044512im_/http://www.socialostracism.com/images/uploads/719_20160316111358.jpg",
    slug: "ban-single-use-plastics-nationwide",
    signatures: 1500,
    decisionMakers: ["Local Council", "School Board"],
    issue:
      "Road safety near schools, leading to accidents and concerns for student well-being.",
    started: "2023-01-15",
    starter: "Aarav Kumar",
    updates: "3 updates",
    location: "Mumbai, India",
    creatorId: "dummyUserId", // Add creatorId
  },
  {
    name: "Meera Joshi",
    role: "Parent",
    message:
      "It’s time to stop single-use plastics in our city. Join the petition today!",
    image:
      "https://web.archive.org/web/20160331044512im_/http://www.socialostracism.com/images/uploads/23_20160227084516.jpg",
    slug: "increase-funding-public-schools",
    signatures: 2200,
    decisionMakers: ["City Council", "Environmental Agency"],
    issue:
      "Excessive single-use plastic waste polluting the city and harming wildlife.",
    started: "2023-02-20",
    starter: "Meera Joshi",
    updates: "5 updates",
    location: "Delhi, India",
    creatorId: "dummyUserId", // Add creatorId
  },
  {
    name: "Kunal Sharma",
    role: "Environmentalist",
    message:
      "We are pushing for more green parks in urban areas for healthier living.",
    image:
      "https://web.archive.org/web/20160331044512im_/http://www.socialostracism.com/images/uploads/23_20160227092509.jpg",
    slug: "protect-endangered-tigers",
    signatures: 1800,
    decisionMakers: ["Urban Planning Department", "Parks and Recreation"],
    issue:
      "Lack of green spaces in crowded urban areas affecting public health and well-being.",
    started: "2023-03-10",
    starter: "Kunal Sharma",
    updates: "2 updates",
    location: "Bangalore, India",
    creatorId: "dummyUserId", // Add creatorId
  },
  {
    name: "Rina Kapoor",
    role: "Activist",
    message: "I successfully started my petition and got a lot of support!",
    image:
      "https://assets.change.org/photos/4/il/ck/OKILckhXytzcRsp-800x450-noPad.jpg?1685722554",
    slug: "improve-road-safety-regulations",
    signatures: 3000,
    decisionMakers: ["Various Government Bodies"],
    issue:
      "The general need for community engagement and support for local initiatives.",
    started: "2023-01-01",
    starter: "Rina Kapoor",
    updates: "10 updates",
    location: "Chennai, India",
    creatorId: "dummyUserId", // Add creatorId
  },
  {
    name: "Simran Kaur",
    role: "Volunteer",
    message:
      "Public transport needs to be improved for everyone. Sign and support!",
    image:
      "https://web.archive.org/web/20160331044512im_/http://www.socialostracism.com/images/uploads/176_20160318013231.jpg",
    slug: "safer-roads-near-schools",
    signatures: 2500,
    decisionMakers: ["Public Transport Authority", "City Mayor"],
    issue:
      "Inadequate public transport system leading to long commutes and limited accessibility.",
    started: "2023-04-05",
    starter: "Simran Kaur",
    updates: "4 updates",
    location: "Kolkata, India",
    creatorId: "dummyUserId", // Add creatorId
  },
  {
    name: "Rajat Mehta",
    role: "Community Member",
    message:
      "Better waste management is crucial for a cleaner and healthier city.",
    image:
      "https://web.archive.org/web/20160331044512im_/http://www.socialostracism.com/images/uploads/23_20160227084516.jpg",
    slug: "ban-single-use-plastics",
    signatures: 1900,
    decisionMakers: ["Waste Management Department", "Local Government"],
    issue:
      "Inefficient waste management practices causing environmental pollution and health hazards.",
    started: "2023-05-01",
    starter: "Rajat Mehta",
    updates: "6 updates",
    location: "Hyderabad, India",
    creatorId: "dummyUserId", // Add creatorId
  },
];

export default function CurrentPetitions() {
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        setLoading(true);
        const data = await safeFetch("/api/petitions");
        
        if (data.success === false && data.rateLimited) {
          console.warn('Rate limit exceeded for current petitions, using fallback');
          setPetitions([]);
        } else {
          setPetitions(data.petitions || []);
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch petitions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetitions();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(petitions.length);
  };

  const handleReadLess = () => {
    setVisibleCount(5);
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-6 px-6">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
          Current Petitions
        </h2>
        <div className="text-center">
          <p className="text-gray-600">Loading petitions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-6 px-6">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
          Current Petitions
        </h2>
        <div className="text-center">
          <p className="text-red-500">Error loading petitions: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-6 px-6">
      <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
        Current Petitions
      </h2>

      {petitions.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No petitions available at the moment.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {petitions.slice(0, visibleCount).map((petition, index) => (
            <Link key={petition._id} href={`/currentpetitions/${petition._id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-2xl transition"
              >
                <div className="w-full h-36 md:h-48 bg-gray-200 flex items-center justify-center">
                  {petition.petitionDetails?.image ? (
                    <Image
                      src={petition.petitionDetails.image}
                      alt={petition.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <p className="text-sm">No Image</p>
                      <p className="text-xs">📋</p>
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-6 text-center">
                  <p className="text-gray-700 text-sm md:text-base mb-2">
                    &quot;
                    {petition.petitionDetails?.problem?.substring(0, 100) ||
                      petition.title}
                    &quot;
                  </p>
                  <h3 className="font-semibold text-base md:text-lg text-gray-900">
                    {petition.petitionStarter?.user?.name ||
                      petition.petitionStarter?.name ||
                      "Anonymous"}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {petition.petitionStarter?.user?.designation ||
                      petition.petitionStarter?.designation ||
                      "Citizen"}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Signatures: {petition.numberOfSignatures || 0}
                  </p>
                  {petition.country && (
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Country: {petition.country}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6 space-x-4">
        {visibleCount < petitions.length && (
          <button
            onClick={handleLoadMore}
            className="bg-[#3650AD] text-white px-6 py-2 rounded-full font-medium hover:bg-teal-600 transition"
          >
            Load More
          </button>
        )}
        {visibleCount === petitions.length && (
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
