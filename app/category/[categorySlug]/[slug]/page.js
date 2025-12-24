"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaChevronRight, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterestP, FaSearch } from "react-icons/fa";
import Footer from "@/components/Footer";

// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        slug: "discovering-hidden-mysteries-petra",
        title: "Discovering the Hidden Mysteries of Petra",
        categories: ["Animals", "Lifestyle"],
        author: "nikkuramani",
        date: "February 26, 2024",
        image: "https://picsum.photos/seed/blog1/1200/700",
        content: `Its some of the time her conduct are placated. Do tuning in am enthusiasm gracious complaint collected. Together cheerful sentiments proceed adolescent had off Obscure may benefit subject her letters one bed. Child a long time clamor yen in forty. Uproarious in this in both hold. My entrance me is transfer lone ranger keep in mind connection.

## 1 - Choose a sustainable travel destination

Goodness acknowledgment flats up sympathize dumbfounded delightful. Holding up him unused enduring towards. Proceeding despairing particularly so to. Me unpleasing incomprehensible in connection reporting so dumbfounded. What inquire leaf may nor upon entryway. Tended stay my do stairs. Goodness grinning genial am so gone by sincere in workplaces hearted.

Goodness acknowledgment flats up sympathize flabbergasted delightful. Holding up him modern enduring towards. Proceeding despairing particularly so to. Me unpleasing incomprehensible in connection declaring so dumbfounded. What inquire leaf may nor upon entryway. Tended stay my do stairs. Gracious grinning pleasant am so gone by cheerful in workplaces hearted.`,
        galleryImages: [
            "https://picsum.photos/seed/gallery1/800/500",
            "https://picsum.photos/seed/gallery2/800/500",
        ],
        quote: {
            text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
            author: "John Doe"
        },
        tags: ["Animal", "Fashion", "Food", "Health", "Music", "Politics", "Race", "Sports", "Tech", "Technology", "Travel", "Western Foods"],
    },
    {
        id: 2,
        slug: "ai-from-pixels-to-art-headliners",
        title: "AI from pixels to art headliners",
        categories: ["Animals", "Technology"],
        author: "nikkuramani",
        date: "February 21, 2024",
        image: "https://picsum.photos/seed/blog7/1200/700",
        content: `The combination of craftsmanship and innovation has inspired transformative times in inventive planning. Manufactured Insights (AI) is at the cutting edge of this insurgency, making already unthinkable inventive capacities open to everybody.`,
        galleryImages: [],
        quote: null,
        tags: ["Technology", "AI", "Art"],
    },
    {
        id: 3,
        slug: "creatures-that-charm-individuals",
        title: "Creatures that charm individuals with their insights",
        categories: ["Animals", "Game"],
        author: "nikkuramani",
        date: "February 21, 2024",
        image: "https://picsum.photos/seed/blog8/1200/700",
        content: `Creatures never desist to flabbergast us with their insights. From the crafty fox to the insightful elephant, creatures have exhibited noteworthy knowledge.`,
        galleryImages: [],
        quote: null,
        tags: ["Animals", "Nature", "Wildlife"],
    },
    {
        id: 4,
        slug: "top-luxury-ideas-high-end-home",
        title: "Top Luxury Ideas for High-End Home Exterior Decor",
        categories: ["Interior", "Lifestyle"],
        author: "nikkuramani",
        date: "February 26, 2024",
        image: "https://picsum.photos/seed/blog2/1200/700",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        galleryImages: [],
        quote: null,
        tags: ["Interior", "Lifestyle", "Home"],
    },
    {
        id: 5,
        slug: "leading-state-art-design-history",
        title: "Leading state of the art design history",
        categories: ["Interior", "Lifestyle"],
        author: "nikkuramani",
        date: "February 23, 2024",
        image: "https://picsum.photos/seed/blog3/1200/700",
        content: `The world of advanced outline has come a long way, with a wealthy history that has changed the...`,
        galleryImages: [],
        quote: null,
        tags: ["Design", "History", "Art"],
    },
];

// Recent posts for sidebar
const recentPosts = [
    { title: "Top Luxury Ideas for High-End Home Exterior Decor", slug: "top-luxury-ideas-high-end-home" },
    { title: "Discovering the Hidden Mysteries of Petra", slug: "discovering-hidden-mysteries-petra" },
    { title: "Leading state of the art design history", slug: "leading-state-art-design-history" },
    { title: "Rapid Aircraft Interior Design via Renderings", slug: "rapid-aircraft-interior-design" },
    { title: "Top color palettes in graphic design", slug: "top-color-palettes-graphic-design" },
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

export default function CategoryPostPage() {
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [saveInfo, setSaveInfo] = useState(false);

    const categorySlug = params.categorySlug;
    const postSlug = params.slug;
    const categoryName = categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) : "";

    // Find the current post
    const post = blogPosts.find(p => p.slug === postSlug) || blogPosts[0];

    // Find previous and next posts in same category
    const categoryPosts = blogPosts.filter(p =>
        p.categories.some(cat => cat.toLowerCase() === categorySlug?.toLowerCase())
    );
    const currentIndex = categoryPosts.findIndex(p => p.slug === postSlug);
    const prevPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < categoryPosts.length - 1 ? categoryPosts[currentIndex + 1] : null;

    const handleSubmitComment = (e) => {
        e.preventDefault();
        console.log({ comment, name, email, website, saveInfo });
    };

    return (
        <>
            <main className="bg-[#f0f2f5] min-h-screen">
                {/* Breadcrumb */}
                <div className="bg-pink-100 border-x border-b border-pink-200 py-4 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <nav className="flex items-center gap-2 text-sm">
                            <Link href="/" className="text-gray-600 hover:text-[#F43676] transition-colors">
                                Home
                            </Link>
                            <FaChevronRight className="text-gray-400 text-xs" />
                            <Link href={`/category/${categorySlug}`} className="text-gray-600 hover:text-[#F43676] transition-colors">
                                {categoryName}
                            </Link>
                            <FaChevronRight className="text-gray-400 text-xs" />
                            <span className="text-[#1a1a2e] font-medium">{post.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Main Content - Left Side */}
                            <div className="lg:w-2/3">
                                {/* Featured Image */}
                                <div className="rounded-3xl overflow-hidden mb-8 shadow-lg">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                {/* Article Content */}
                                <article className="prose prose-lg max-w-none">
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        Its some of the time her conduct are placated. Do tuning in am enthusiasm gracious complaint collected. Together cheerful sentiments proceed adolescent had off Obscure may benefit subject her letters one bed. Child a long time clamor yen in forty. Uproarious in this in both hold. My entrance me is transfer lone ranger keep in mind connection.
                                    </p>

                                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">
                                        1 - Choose a sustainable travel destination
                                    </h2>

                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Goodness acknowledgment flats up sympathize dumbfounded delightful. Holding up him unused enduring towards. Proceeding despairing particularly so to. Me unpleasing incomprehensible in connection reporting so dumbfounded. What inquire leaf may nor upon entryway. Tended stay my do stairs. Goodness grinning genial am so gone by sincere in workplaces hearted.
                                    </p>

                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        Goodness acknowledgment flats up sympathize flabbergasted delightful. Holding up him modern enduring towards. Proceeding despairing particularly so to. Me unpleasing incomprehensible in connection declaring so dumbfounded. What inquire leaf may nor upon entryway. Tended stay my do stairs. Gracious grinning pleasant am so gone by cheerful in workplaces hearted.
                                    </p>

                                    {/* Image with Caption */}
                                    <div className="mb-8">
                                        <div className="rounded-2xl overflow-hidden">
                                            <img
                                                src="https://picsum.photos/seed/caption1/900/500"
                                                alt="Caption image"
                                                className="w-full h-auto object-cover"
                                            />
                                            <div className="bg-black/60 text-white text-center py-4 -mt-14 relative">
                                                <p className="text-lg font-medium">Caption can be used to add info</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        One who does not do any work except to get some benefit from it. Do not be angry with pain in scolding. In happiness he wants to become hairy with pain in the hope that reproduction will not occur. Unless they are blinded by lust, they do not move forward; The culprits are those who abandon their duties and soften their hearts, that is, their hard work.
                                    </p>

                                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">
                                        2 - Investigation Prior to Reservation
                                    </h2>

                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>

                                    {/* Blockquote */}
                                    <div className="border-l-4 border-[#F43676] bg-gray-50 rounded-r-2xl p-6 mb-8 relative">
                                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                            Neque porro quisquam est, qui <strong>dolorem ipsum</strong> quia <strong>dolor sit amet</strong>, <strong>consectetur</strong>, <strong>adipisci velit, sed</strong> quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                        </p>
                                        <p className="text-gray-500 text-sm">— John Doe</p>
                                        <div className="absolute bottom-4 right-6 text-6xl text-gray-200 font-serif">"</div>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>

                                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">
                                        3 - Pack light , Simple Economical Travel Tip
                                    </h2>

                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>

                                    {/* Two Column Images */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        <div className="rounded-2xl overflow-hidden">
                                            <img
                                                src="https://picsum.photos/seed/twocol1/500/400"
                                                alt="Gallery image 1"
                                                className="w-full h-64 object-cover"
                                            />
                                        </div>
                                        <div className="rounded-2xl overflow-hidden">
                                            <img
                                                src="https://picsum.photos/seed/twocol2/500/400"
                                                alt="Gallery image 2"
                                                className="w-full h-64 object-cover"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </article>

                                {/* Post Tags */}
                                <div className="flex flex-wrap gap-2 mt-8 mb-8">
                                    {post.tags?.map((tag, index) => (
                                        <Link
                                            key={index}
                                            href={`/search?tag=${tag.toLowerCase()}`}
                                            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#F43676] hover:text-[#F43676] transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>

                                {/* Author Box */}
                                <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${post.author}&background=random&size=64`}
                                                alt={post.author}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#1a1a2e]">{post.author}</h4>
                                            <Link href={`/author/${post.author}`} className="text-gray-500 hover:text-[#F43676] transition-colors text-sm">
                                                View All Posts
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Previous/Next Posts */}
                                <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
                                    {prevPost && (
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-[#1a1a2e] mb-3">Previous Post</p>
                                            <Link href={`/category/${categorySlug}/${prevPost.slug}`} className="flex items-center gap-3 group">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={prevPost.image}
                                                        alt={prevPost.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <p className="text-gray-600 group-hover:text-[#F43676] transition-colors text-sm leading-snug">
                                                    {prevPost.title}
                                                </p>
                                            </Link>
                                        </div>
                                    )}
                                    {nextPost && (
                                        <div className="flex-1 text-right">
                                            <p className="text-sm font-semibold text-[#1a1a2e] mb-3">Next Post</p>
                                            <Link href={`/category/${categorySlug}/${nextPost.slug}`} className="flex items-center gap-3 justify-end group">
                                                <p className="text-gray-600 group-hover:text-[#F43676] transition-colors text-sm leading-snug">
                                                    {nextPost.title}
                                                </p>
                                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={nextPost.image}
                                                        alt={nextPost.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Comments Section */}
                                <div className="bg-white rounded-3xl p-8 shadow-sm">
                                    <h3 className="text-2xl font-bold text-[#1a1a2e] text-center mb-2">Comments</h3>
                                    <p className="text-gray-500 text-center mb-8">No comments yet. Why don't you start the discussion?</p>

                                    <h4 className="text-2xl font-bold text-[#1a1a2e] text-center mb-2">Leave a Reply</h4>
                                    <p className="text-gray-600 text-center mb-6">
                                        Your email address will not be published. Required fields are marked <span className="text-[#F43676]">*</span>
                                    </p>

                                    <form onSubmit={handleSubmitComment}>
                                        <div className="mb-6">
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Write a comment..."
                                                rows={6}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#F43676] transition-colors resize-y"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                                                    Name <span className="text-[#F43676]">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#F43676] transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                                                    Email <span className="text-[#F43676]">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#F43676] transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                                                    Website
                                                </label>
                                                <input
                                                    type="url"
                                                    value={website}
                                                    onChange={(e) => setWebsite(e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#F43676] transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mb-6">
                                            <input
                                                type="checkbox"
                                                id="saveInfo"
                                                checked={saveInfo}
                                                onChange={(e) => setSaveInfo(e.target.checked)}
                                                className="w-5 h-5 rounded border-gray-300 text-[#F43676] focus:ring-[#F43676]"
                                            />
                                            <label htmlFor="saveInfo" className="text-gray-600 text-sm">
                                                Save my name, email, and website in this browser for the next time I comment.
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-[#F43676] text-white font-medium rounded-full hover:bg-[#e02a60] transition-colors"
                                        >
                                            Post Comment
                                        </button>
                                    </form>
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
