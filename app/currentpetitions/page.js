"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import CurrentPetitions from "../../components/CurrentPetitions";

export default function CurrentPetitionsPage() {
  return (
    <>
      {/* Navigation Banner */}
      <div className="bg-pink-100 border-b border-pink-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1a1a2e]">Current Petitions</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#F43676] transition-colors">
              Home
            </Link>
            <FaChevronRight className="text-gray-400 text-xs" />
            <span className="text-[#1a1a2e] font-medium">Current Petitions</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-[#f0f2f5] min-h-screen py-12 px-6">
        <CurrentPetitions />
      </main>
    </>
  );
}
