"use client";

import React from 'react';

export default function AdvertisePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 lg:px-8 bg-white shadow-lg rounded-xl mt-8 mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 leading-tight">
        Advertise with Sosign
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Advertise with Us!</h2>
        <p className="text-lg">
          We&apos;ve run fruitful Sponsored Campaigns with many philanthropies, orgs, brands, and political battles that compass each issue range.
        </p>
        <p className="text-lg mt-4">
          If you wish to run advertisement on Sosign to promote your online campaign then you can send us an email on{' '}
          <a href="mailto:info@sosign.com" className="text-blue-600 hover:underline">
            info@sosign.com
          </a>
        </p>
      </div>
    </div>
  );
}
