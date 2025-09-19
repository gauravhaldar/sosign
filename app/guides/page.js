"use client";

import React from 'react';
import Link from "next/link";

export default function GuidesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 lg:px-8 bg-white shadow-lg rounded-xl mt-8 mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 leading-tight">
        Guides for Sosign
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Modify your own neighborhood or even your entire world.
        </p>

        <p>
          Each day, persons that you make actual change with difficulties that they love together with Modify. If you need a number of backdrop info, understand precisely how the on the web petition is effective. For anyone who is completely ready to get started, understand the easy tip sheets below:
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Start Your Petition:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Set a goal</li>
          <li>Choose a decision maker</li>
          <li>Tell your story</li>
          <li>Categorize your petition</li>
          <li>Edit your title</li>
          <li>Upload a photo or video</li>
          <li>Add your decision maker&apos;s contact information</li>
          <li>Write a letter to your decision maker</li>
          <li>Use an email address you check regularly</li>
          <li>Post updates to your petition page</li>
          <li>Stay tuned for additional tips and guides from us</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Promote Your Petitions:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Email your friends and family.</li>
          <li>Share your petition on Facebook.</li>
          <li>Tweet and post updates.</li>
          <li>Tell your story with video.</li>
          <li>Post on your own blog or listserv.</li>
          <li>Reach out to local bloggers and mailing lists.</li>
          <li>Find allies in local groups and organizations.</li>
        </ul>
      </div>
    </div>
  );
}
