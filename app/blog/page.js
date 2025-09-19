"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { posts } from '../../components/BlogPostsData';

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-6 lg:px-8 bg-white shadow-lg rounded-xl mt-8 mb-12">
      <h1 className="text-4xl md:text-5xl font-regular mb-10 text-center text-gray-900 leading-tight">
        Sosign Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Type and hit enter..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Blog Posts */}
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {post.date} by <span className="font-medium">{post.author}</span>
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {post.content}
              </p>
              {post.link && (
                <Link href={post.link} className="text-blue-600 hover:underline font-semibold">
                  Read more
                </Link>
              )}
            </div>
          ))}

          {/* Posts Navigation */}
          <div className="flex justify-between mt-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition">
              Older posts
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition">
              New updates
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Recent Posts</h3>
          <ul className="space-y-3">
            {posts.map((post, index) => (
              <li key={index}>
                <Link href={post.link || '#'} className="text-gray-700 hover:text-blue-600 hover:underline transition">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
