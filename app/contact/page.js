"use client";

import React from 'react';
import { MapPin, Globe, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Reach out to us using the contact details below or send us a message.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Location Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3650AD]/10 to-[#3650AD]/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#3650AD]" />
              </div>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Our Location</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              NESCO CENTER, GOREGAON EAST<br />
              Mumbai, India
            </p>
          </div>

          {/* Website Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F43676]/10 to-[#F43676]/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#F43676]" />
              </div>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Website</h2>
            </div>
            <a
              href="https://sosign.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3650AD] hover:text-[#F43676] font-medium transition-colors"
            >
              SOSIGN.IN
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Phone</h2>
            </div>
            <a
              href="tel:+919323677688"
              className="text-gray-700 hover:text-[#3650AD] font-medium transition-colors"
            >
              +91 9323677688
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Email</h2>
            </div>
            <a
              href="mailto:support@sosign.in"
              className="text-gray-700 hover:text-[#3650AD] font-medium transition-colors"
            >
              support@sosign.in
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-[#1a1a2e]">Send us a Message</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3650AD] focus:border-transparent outline-none transition"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3650AD] focus:border-transparent outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3650AD] focus:border-transparent outline-none transition"
                placeholder="Subject of your message"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3650AD] focus:border-transparent outline-none transition resize-none"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-[#3650AD] to-[#F43676] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
