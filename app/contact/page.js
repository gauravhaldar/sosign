"use client";

import React from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#fce4ec] to-[#f8bbd9] py-6 px-8 sm:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">Contact</h1>
          <nav className="flex items-center gap-2 text-sm text-[#1a1a2e]">
            <Link href="/" className="hover:text-[#F43676] transition-colors">Home</Link>
            <FaChevronRight className="text-xs text-gray-500" />
            <span className="text-[#1a1a2e] font-medium">Contact</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 sm:px-16 lg:px-24 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 sm:p-12 lg:p-16">
          {/* Header Section */}
          <div className="text-center mb-10">
            <p className="text-[#F43676] font-medium mb-4">I'd love to hear from you</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-2">Hey, there!</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e]">
              Send me a <span className="italic">message</span>.
            </h3>
          </div>

          {/* Description */}
          <div className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            <p className="mb-4">
              Oh acceptance apartments up sympathize astonished delightful. Waiting him new lasting towards.
              Continuing melancholy especially so to. Me{' '}
              <Link href="#" className="text-[#F43676] underline hover:text-[#e02a60]">unpleasing impossible</Link>
              {' '}in attachment announcing so astonished.
            </p>
            <p className="text-gray-500">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 text-[#1a1a2e] font-medium">
            <a href="mailto:demo@info.com" className="hover:text-[#F43676] transition-colors">
              demo@info.com
            </a>
            <a href="tel:+0121145 8970" className="hover:text-[#F43676] transition-colors">
              +012 1145 8970
            </a>
          </div>

          {/* CTA Text */}
          <p className="text-center text-gray-600 mb-10">
            Feel free to <span className="font-semibold text-[#1a1a2e]">send a message</span>, just fill the form below
            and <span className="font-semibold text-[#1a1a2e]">I will reply you shortly!</span> 👍
          </p>

          {/* Contact Form */}
          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#F43676] focus:ring-1 focus:ring-[#F43676] transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#F43676] focus:ring-1 focus:ring-[#F43676] transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-5 py-4 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#F43676] focus:ring-1 focus:ring-[#F43676] transition-colors"
              />
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                className="w-full px-5 py-4 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#F43676] focus:ring-1 focus:ring-[#F43676] transition-colors resize-y"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-8 py-3 bg-[#F43676] text-white font-medium rounded-lg hover:bg-[#e02a60] transition-colors shadow-md hover:shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
