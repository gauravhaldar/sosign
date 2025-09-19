"use client";

import React from 'react';

export default function PressPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 lg:px-8 bg-white shadow-lg rounded-xl mt-8 mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 leading-tight">
        Press Release for Sosign
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed text-center">
        <p className="text-lg">
          For the Media & Press Updates you can contact our correspondent on{' '}
          <a href="mailto:info@sosign.com" className="text-blue-600 hover:underline">
            info@sosign.com
          </a>
        </p>
      </div>
    </div>
  );
}
