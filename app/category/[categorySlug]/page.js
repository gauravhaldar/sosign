"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronRight, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterestP, FaSearch, FaCalendarAlt, FaPlay } from "react-icons/fa";
import Footer from "@/components/Footer";

// Sample blog posts data with categories
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
        slug: "ai-from-pixels-to-art-headliners",
        title: "AI from pixels to art headliners",
        description: "The combination of craftsmanship and innovation has inspired transformative times in inventive planning. Manufactured Insights (AI) is at...",
        categories: ["Animals", "Technology"],
        author: "nikkuramani",
        date: "February 21, 2024",
        image: "https://picsum.photos/seed/blog7/500/400",
        featured: false,
        hasVideo: false,
    },
    {
        id: 3,
        slug: "creatures-that-charm-individuals",
        title: "Creatures that charm individuals with their insights",
        description: "Creatures never desist to flabbergast us with their...",
        categories: ["Animals", "Game"],
        author: "nikkuramani",
        date: "February 21, 2024",
        image: "https://picsum.photos/seed/blog8/500/400",
        featured: false,
        hasVideo: false,
    },
    {
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
];

// Recent posts for sidebar
const recentPosts = [
    { title: "Top Luxury Ideas for High-End Home Exterior Decor", slug: "top-luxury-ideas-high-end-home", image: "https://picsum.photos/seed/recent1/100/100" },
    { title: "Discovering the Hidden Mysteries of Petra", slug: "discovering-hidden-mysteries-petra", image: "https://picsum.photos/seed/recent2/100/100" },
    { title: "Leading state of the art design history", slug: "leading-state-art-design-history", image: "https://picsum.photos/seed/recent3/100/100" },
    { title: "Rapid Aircraft Interior Design via Renderings", slug: "rapid-aircraft-interior-design", image: "https://picsum.photos/seed/recent4/100/100" },
    { title: "Top color palettes in graphic design", slug: "top-color-palettes-graphic-design", image: "https://picsum.photos/seed/recent5/100/100" },
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

export default function CategoryPage() {
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState("");

    // Get category name from slug
    const categorySlug = params.categorySlug;
    const categoryName = categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) : "";

    // Filter posts by category
    const filteredPosts = blogPosts.filter(post =>
        post.categories.some(cat => cat.toLowerCase() === categorySlug?.toLowerCase())
    );

    return (
        <>
            <main className="bg-[#f0f2f5] min-h-screen">
                {/* Header with Category Name */}
                <div className="bg-pink-100 border-b border-pink-200 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-[#1a1a2e]">{categoryName}</h1>
                        <nav className="flex items-center gap-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-[#F43676] transition-colors">
                                Home
                            </Link>
                            <FaChevronRight className="text-gray-400 text-xs" />
                            <span className="text-[#1a1a2e] font-medium">{categoryName}</span>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Main Content - Left Side */}
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-3xl p-6 shadow-sm">
                                    <div className="space-y-6">
                                        {filteredPosts.length > 0 ? (
                                            filteredPosts.map((post) => (
                                                <div
                                                    key={post.id}
                                                    className={`relative bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 ${post.featured ? "ring-2 ring-[#F43676]" : ""
                                                        }`}
                                                >
                                                    <Link href={`/category/${categorySlug}/${post.slug}`} className="flex flex-col sm:flex-row items-center">
                                                        {/* Image */}
                                                        <div className="sm:w-2/5 relative sm:-ml-6 my-4 sm:my-6">
                                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                                                                <img
                                                                    src={post.image}
                                                                    alt={post.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            {/* Feature Icon */}
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
                                                        <div className="sm:w-3/5 p-6">
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
                                                            <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 leading-tight hover:text-[#F43676] transition-colors">
                                                                {post.title}
                                                            </h3>

                                                            {/* Description */}
                                                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                                                {post.description}
                                                            </p>

                                                            {/* Author Info */}
                                                            <div className="flex items-center gap-3 text-sm">
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
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-12">No posts found in this category.</p>
                                        )}
                                    </div>
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
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-l-lg outline-none focus:border-[#F43676] transition-colors"
                                        />
                                        <button className="px-5 py-3 bg-[#F43676] text-white rounded-r-lg hover:bg-[#e02a60] transition-colors">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Posts */}
                                <div className="bg-white rounded-3xl p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <h3 className="text-xl font-bold text-[#1a1a2e]">Recent Posts</h3>
                                        <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                                    </div>
                                    <ul className="space-y-3">
                                        {recentPosts.map((post, index) => (
                                            <li key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                                <Link
                                                    href={`/category/${categorySlug}/${post.slug}`}
                                                    className="text-gray-600 hover:text-[#F43676] transition-colors text-sm leading-relaxed block"
                                                >
                                                    {post.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
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
                                                    className={`transition-colors ${category.toLowerCase() === categorySlug?.toLowerCase()
                                                        ? "text-[#F43676] font-medium"
                                                        : "text-gray-600 hover:text-[#F43676]"
                                                        }`}
                                                >
                                                    {category}
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
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                        John Doe is a versatile writer with a passion for storytelling. With a background in literature and a love for exploring diverse themes, his words captivate and resonate with readers across genres.
                                    </p>
                                    {/* Social Icons */}
                                    <div className="flex justify-center gap-2">
                                        <a href="#" className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                            <FaFacebookF className="text-sm" />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                            <FaTwitter className="text-sm" />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                            <FaInstagram className="text-sm" />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                            <FaLinkedinIn className="text-sm" />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                            <FaYoutube className="text-sm" />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-[#bd081c] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                            <FaPinterestP className="text-sm" />
                                        </a>
                                    </div>
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
                                    <div className="rounded-2xl overflow-hidden relative">
                                        <img
                                            src="https://picsum.photos/seed/ad1/400/500"
                                            alt="Advertisement"
                                            className="w-full h-auto"
                                        />
                                        <div className="absolute top-4 left-4 text-white">
                                            <p className="text-2xl font-bold">SUMMER SALES!</p>
                                            <p className="text-3xl font-bold">20%</p>
                                            <button className="mt-2 px-4 py-1 bg-white text-black text-sm font-medium rounded">
                                                Shop Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
