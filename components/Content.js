"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaCalendarAlt, FaPlay, FaChevronRight } from "react-icons/fa";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    slug: "discovering-hidden-mysteries-petra",
    title: "Discovering the Hidden Mysteries of Petra",
    description: "Its some of the time her conduct are placated. Do tuning in am enthusiasm gracious complaint collected. Together...",
    categories: ["Animals", "Lifestyle"],
    author: "nikkuramani",
    date: "February 26, 2024",
    image: "https://picsum.photos/seed/blog1/500/400",
    featured: true,
    hasVideo: false,
  },
  {
    id: 2,
    slug: "top-luxury-ideas-high-end-home",
    title: "Top Luxury Ideas for High-End Home Exterior Decor",
    description: "Its some of the time her conduct are placated. Do tuning in am enthusiasm gracious complaint collected. Together...",
    categories: ["Interior", "Lifestyle"],
    author: "nikkuramani",
    date: "February 26, 2024",
    image: "https://picsum.photos/seed/blog2/500/400",
    featured: false,
    hasVideo: true,
  },
  {
    id: 3,
    slug: "leading-state-art-design-history",
    title: "Leading state of the art design history",
    description: "The world of advanced outline has come a long way, with a wealthy history that has changed the...",
    categories: ["Interior", "Lifestyle"],
    author: "nikkuramani",
    date: "February 23, 2024",
    image: "https://picsum.photos/seed/blog3/500/400",
    featured: false,
    hasVideo: true,
  },
  {
    id: 4,
    slug: "rapid-aircraft-interior-design",
    title: "Rapid Aircraft Interior Design via Renderings",
    description: "When it comes to insides plan, visualizing the ultimate result is vital. Renderings are important devices that permit...",
    categories: ["Lifestyle", "Technology"],
    author: "nikkuramani",
    date: "February 21, 2024",
    image: "https://picsum.photos/seed/blog4/500/400",
    featured: false,
    hasVideo: false,
  },
  {
    id: 5,
    slug: "top-color-palettes-graphic-design",
    title: "Top color palettes in graphic design",
    description: "Presenting children to the world of computerized craftsmanship and plan can be an energizing and fulfilling experience...",
    categories: ["Game", "Interior"],
    author: "nikkuramani",
    date: "February 21, 2024",
    image: "https://picsum.photos/seed/blog5/500/400",
    featured: false,
    hasVideo: true,
  },
  {
    id: 6,
    slug: "manufactured-insights-generative-picture",
    title: "Manufactured Insights within the generative picture handle",
    description: "Artificial intelligence (AI) is rapidly developing and playing a significant role in generative image generation, which is influencing...",
    categories: ["Game", "Technology"],
    author: "nikkuramani",
    date: "February 21, 2024",
    image: "https://picsum.photos/seed/blog6/500/400",
    featured: false,
    hasVideo: true,
  },
];

// Page 2 blog posts data
const blogPostsPage2 = [
  {
    id: 7,
    slug: "sustainable-architecture-future",
    title: "Sustainable Architecture: Building the Future",
    description: "Exploring how eco-friendly designs and renewable materials are reshaping the construction industry for a greener tomorrow...",
    categories: ["Interior", "Technology"],
    author: "greenbuilder",
    date: "February 18, 2024",
    image: "https://picsum.photos/seed/blog7/500/400",
    featured: true,
    hasVideo: false,
  },
  {
    id: 8,
    slug: "wildlife-photography-tips",
    title: "Wildlife Photography: Capturing Nature's Beauty",
    description: "Master the art of wildlife photography with these essential tips and techniques from professional nature photographers...",
    categories: ["Animals", "Travel"],
    author: "naturelens",
    date: "February 17, 2024",
    image: "https://picsum.photos/seed/blog8/500/400",
    featured: false,
    hasVideo: true,
  },
  {
    id: 9,
    slug: "gaming-industry-evolution",
    title: "The Evolution of Gaming: From Pixels to Virtual Reality",
    description: "A comprehensive look at how video games have transformed from simple arcade classics to immersive virtual experiences...",
    categories: ["Game", "Technology"],
    author: "gamerpro",
    date: "February 15, 2024",
    image: "https://picsum.photos/seed/blog9/500/400",
    featured: false,
    hasVideo: true,
  },
  {
    id: 10,
    slug: "minimalist-living-guide",
    title: "The Complete Guide to Minimalist Living",
    description: "Discover the freedom of living with less. Learn how minimalism can reduce stress and improve your quality of life...",
    categories: ["Lifestyle", "Interior"],
    author: "simplyliving",
    date: "February 14, 2024",
    image: "https://picsum.photos/seed/blog10/500/400",
    featured: false,
    hasVideo: false,
  },
  {
    id: 11,
    slug: "extreme-sports-adventures",
    title: "Extreme Sports: Pushing Human Limits",
    description: "From skydiving to base jumping, explore the world of extreme sports and the athletes who dare to defy gravity...",
    categories: ["Sports", "Lifestyle"],
    author: "adrenalinehunter",
    date: "February 12, 2024",
    image: "https://picsum.photos/seed/blog11/500/400",
    featured: false,
    hasVideo: true,
  },
  {
    id: 12,
    slug: "hidden-travel-destinations",
    title: "Hidden Travel Destinations You Must Visit",
    description: "Escape the tourist crowds and discover these breathtaking hidden gems around the world that offer authentic experiences...",
    categories: ["Travel", "Lifestyle"],
    author: "wanderlust",
    date: "February 10, 2024",
    image: "https://picsum.photos/seed/blog12/500/400",
    featured: false,
    hasVideo: false,
  },
];

// Recent posts for sidebar
const recentPosts = [
  "Top Luxury Ideas for High-End Home Exterior Decor",
  "Discovering the Hidden Mysteries of Petra",
  "Leading state of the art design history",
  "Rapid Aircraft Interior Design via Renderings",
];

// Categories
const categories = [
  "Animals",
  "Game",
  "Interior",
  "Lifestyle",
  "Sports",
  "Technology",
  "Travel",
];

// Tags
const tags = [
  "Animal",
  "Fashion",
  "Food",
  "Health",
  "Music",
  "Politics",
  "Race",
  "Sports",
  "Tech",
  "Technology",
  "Travel",
];

export default function Content() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="bg-[#f0f2f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:w-2/3">
            <div className="space-y-12 sm:space-y-6">
              {(currentPage === 1 ? blogPosts : blogPostsPage2).map((post, index) => (
                <div
                  key={post.id}
                  className={`relative bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow ${post.featured ? "ring-2 ring-[#F43676]" : ""
                    }`}
                >
                  <Link href={`/category/${post.categories[0].toLowerCase()}/${post.slug}`} className="flex flex-col sm:flex-row items-center">
                    {/* Image - Extended outside */}
                    <div className="w-[85%] sm:w-2/5 relative -mt-8 sm:mt-0 sm:-ml-6 mx-auto sm:mx-0 sm:my-6">
                      <div className="aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Feature/Video Icon */}
                      {post.featured && (
                        <div className="absolute top-4 right-4 w-10 h-10 bg-[#F43676] rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                      {post.hasVideo && !post.featured && (
                        <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                          <FaPlay className="text-white text-sm ml-0.5" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="w-full sm:w-3/5 p-4 sm:p-6">
                      {/* Category Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#fce4ec] text-[#F43676] rounded-full text-xs font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-[#1a1a2e] mb-2 sm:mb-3 leading-tight hover:text-[#F43676] transition-colors">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-500 text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {post.description}
                      </p>

                      {/* Author Info */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={`https://ui-avatars.com/api/?name=${post.author}&background=random&size=32`}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-gray-600 font-medium">{post.author}</span>
                        <span className="text-gray-400">•</span>
                        <span className="flex items-center gap-1 text-gray-400">
                          <FaCalendarAlt className="text-xs" />
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-10 h-10 rounded-full font-medium flex items-center justify-center transition-colors ${currentPage === 1
                  ? "bg-[#F43676] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-10 h-10 rounded-full font-medium flex items-center justify-center transition-colors ${currentPage === 2
                  ? "bg-[#F43676] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(currentPage === 1 ? 2 : 1)}
                className="w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3 space-y-6">
            {/* Search Box */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">Search</h3>
                <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-l-lg outline-none focus:border-[#F43676] transition-colors"
                />
                <button className="px-5 py-3 bg-[#F43676] text-white rounded-r-lg hover:bg-[#e02a60] transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">Recent Comments</h3>
                <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
              </div>
              <p className="text-gray-500 text-sm">No comments to show.</p>
            </div>

            {/* Archives */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">Archives</h3>
                <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
              </div>
              <p className="text-gray-600">February 2024</p>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">Categories</h3>
                <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
              </div>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                    <Link
                      href={`/category/${category.toLowerCase()}`}
                      className="text-gray-600 hover:text-[#F43676] transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">Recent Posts</h3>
                <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
              </div>
              <ul className="space-y-3">
                {recentPosts.map((post, index) => (
                  <li key={index} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                    <Link
                      href="/blog"
                      className="text-gray-600 hover:text-[#F43676] transition-colors text-sm leading-relaxed block"
                    >
                      {post}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Author Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-100">
                <img
                  src="https://picsum.photos/seed/author/200/200"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-[#1a1a2e] mb-2">John Doe</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                John Doe is a versatile writer with a passion for exploring diverse topics and sharing insights.
              </p>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">Tags</h3>
                <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/search?tag=${tag.toLowerCase()}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#F43676] hover:text-[#F43676] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Ads */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">Ads</h3>
                <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://picsum.photos/seed/ad1/400/500"
                  alt="Advertisement"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
