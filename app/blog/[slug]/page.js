"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaChevronRight, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterestP, FaSearch, FaSpinner, FaCalendarAlt, FaUser, FaBookOpen, FaArrowLeft } from "react-icons/fa";
import Footer from "@/components/Footer";

// Categories
const categories = [
  "General",
  "Change",
  "Inspiration",
  "Stories",
  "Community",
  "Action",
  "Impact",
];

// Tags
const tags = [
  "Change",
  "Inspiration",
  "Stories",
  "Community",
  "Action",
  "Hope",
  "Voice",
  "Impact",
];

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch blog by slug
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${backendUrl}/api/blogs/${params.slug}`);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Blog not found");
          }
          throw new Error("Failed to fetch blog");
        }

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  // Fetch recent blogs for sidebar
  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${backendUrl}/api/blogs?limit=5`);

        if (res.ok) {
          const data = await res.json();
          setRecentBlogs(data.blogs || []);
        }
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
      }
    };

    fetchRecentBlogs();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <main className="bg-[#f0f2f5] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-[#F43676]" />
            <span className="ml-3 text-lg text-gray-600">Loading blog...</span>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <main className="bg-[#f0f2f5] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-[#002050] mb-2">Blog Not Found</h3>
              <p className="text-[#302d55] mb-6">{error || "The blog you're looking for doesn't exist."}</p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F43676] text-white rounded-full font-medium hover:bg-[#e02a60] transition-colors"
              >
                <FaArrowLeft className="text-sm" />
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
              <Link href="/blog" className="text-gray-600 hover:text-[#F43676] transition-colors">
                Blog
              </Link>
              <FaChevronRight className="text-gray-400 text-xs" />
              <span className="text-[#002050] font-medium line-clamp-1">{blog.title}</span>
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
                <div className="rounded-3xl overflow-hidden mb-8 shadow-lg relative aspect-[16/9]">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F43676] to-[#002050] flex items-center justify-center">
                      <FaBookOpen className="text-white text-6xl opacity-50" />
                    </div>
                  )}
                </div>

                {/* Article Header */}
                <div className="mb-8">
                  {/* Category */}
                  {blog.category && (
                    <span className="inline-block px-4 py-1.5 bg-[#F43676] text-white rounded-full text-sm font-medium mb-4">
                      {blog.category}
                    </span>
                  )}

                  <h1 className="text-3xl md:text-4xl font-bold text-[#002050] mb-4 leading-tight">
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#F43676]" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-2">
                      <FaUser className="text-[#F43676]" />
                      {blog.author}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <article className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-600 leading-relaxed whitespace-pre-wrap"
                    style={{ lineHeight: '1.8' }}
                  >
                    {blog.content}
                  </div>
                </article>

                {/* Post Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 mb-8">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#F43676] hover:text-[#F43676] transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Author Box */}
                <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#F43676] to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                      {blog.author?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#002050]">{blog.author}</h4>
                      <p className="text-gray-500 text-sm">Author</p>
                    </div>
                  </div>
                </div>

                {/* Back to Blog */}
                <div className="mb-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#F43676] text-white rounded-full font-medium hover:bg-[#e02a60] transition-colors"
                  >
                    <FaArrowLeft className="text-sm" />
                    Back to All Blogs
                  </Link>
                </div>
              </div>

              {/* Sidebar - Right Side */}
              <div className="lg:w-1/3 space-y-6">
                {/* Search Box */}
                {/* <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-[#002050]">Search</h3>
                    <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        window.location.href = `/blog?search=${encodeURIComponent(searchQuery)}`;
                      }
                    }}
                    className="flex"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-l-lg outline-none focus:border-[#F43676] transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-[#F43676] text-white rounded-r-lg hover:bg-[#e02a60] transition-colors"
                    >
                      <FaSearch />
                    </button>
                  </form>
                </div> */}

                {/* Recent Blogs */}
                {recentBlogs.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-xl font-bold text-[#002050]">Recent Posts</h3>
                      <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                    </div>
                    <ul className="space-y-4">
                      {recentBlogs.map((recentBlog) => (
                        <li key={recentBlog._id} className="group">
                          <Link
                            href={`/blog/${recentBlog.slug}`}
                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-pink-50 transition-colors"
                          >
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                              {recentBlog.image ? (
                                <Image
                                  src={recentBlog.image}
                                  alt={recentBlog.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#F43676] to-[#002050] flex items-center justify-center">
                                  <FaBookOpen className="text-white text-sm opacity-50" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-[#002050] line-clamp-2 group-hover:text-[#F43676] transition-colors leading-tight">
                                {recentBlog.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">{formatDate(recentBlog.createdAt)}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-[#002050]">Categories</h3>
                    <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                  </div>
                  <ul className="space-y-3">
                    {categories.map((category, index) => (
                      <li key={index} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                        <Link
                          href={`/blog?category=${category.toLowerCase()}`}
                          className="text-gray-600 hover:text-[#F43676] transition-colors"
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Author Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-100 bg-gradient-to-br from-[#F43676] to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                    {blog.author?.charAt(0).toUpperCase()}
                  </div>
                  <h4 className="text-xl font-bold text-[#002050] mb-2">{blog.author}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Author of this blog post. Thank you for reading!
                  </p>
                  {/* Social Icons */}
                  {/* <div className="flex justify-center gap-2">
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
                  </div> */}
                </div>

                {/* Tags */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-[#002050]">Tags</h3>
                    <span className="w-2 h-2 bg-[#F43676] rounded-full"></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-[#302d55] rounded-full text-sm font-medium hover:bg-[#F43676] hover:text-white transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#F43676] to-[#e02a60] rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Have a Story?</h3>
                    <p className="text-white/90 text-sm mb-4">
                      Start a petition and share your story with the world.
                    </p>
                    <Link
                      href="/start-petition"
                      className="inline-block w-full text-center bg-white text-[#F43676] px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Start a Petition
                    </Link>
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
