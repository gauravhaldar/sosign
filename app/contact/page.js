"use client";

import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 lg:px-8 bg-white shadow-lg rounded-xl mt-8 mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 leading-tight">
        Contact Us
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-center text-lg">
          We&apos;d love to hear from you! Please fill out the form below or reach out to us using the contact details.
        </p>

        <div className="mt-10 p-8 bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Subject of your message"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-10 p-8 bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Our Contact Details</h2>
          <p className="text-gray-700">
            <strong>Email:</strong> info@sosign.com
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Address:</strong> 123 Sosign Street, City, Country, 12345
          </p>
        </div>
      </div>
    </div>
  );
}
