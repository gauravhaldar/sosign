"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import {
  FaUserCircle,
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
  FaSearch,
  FaMoon,
  FaChevronDown,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [campaignDropdown, setCampaignDropdown] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex justify-between h-24 items-center">
          {/* Left side: Logo Only */}
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/">
                <Image
                  src="/log.png"
                  alt="SOSIGN Logo"
                  width={140}
                  height={45}
                  className="h-10 w-auto"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right side: Navigation + Actions */}
          <div className="flex items-center gap-6">
            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-[#F43676] font-semibold text-base hover:text-[#F43676] transition-colors duration-200"
              >
                Home
              </Link>

              {/* Start Campaign Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCampaignDropdown(true)}
                onMouseLeave={() => setCampaignDropdown(false)}
              >
                <button className="flex items-center gap-1 text-gray-600 font-semibold text-base hover:text-[#F43676] transition-colors duration-200">
                  Start Campaign
                  <FaChevronDown className="text-sm" />
                </button>
                <AnimatePresence>
                  {campaignDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                    >
                      <Link
                        href="/start-petition"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                      >
                        Start a Petition
                      </Link>
                      <Link
                        href="/my-petition"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                      >
                        My Petitions
                      </Link>
                      <Link
                        href="/currentpetitions"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                      >
                        Current Petitions
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pages Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPagesDropdown(true)}
                onMouseLeave={() => setPagesDropdown(false)}
              >
                <button className="flex items-center gap-1 text-gray-600 font-semibold text-base hover:text-[#F43676] transition-colors duration-200">
                  Pages
                  <FaChevronDown className="text-sm" />
                </button>
                <AnimatePresence>
                  {pagesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                    >
                      <Link
                        href="/about"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                      >
                        About Us
                      </Link>
                      <Link
                        href="/successfulpetitions"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                      >
                        Success Stories
                      </Link>
                      <Link
                        href="/blog"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                      >
                        Blog
                      </Link>
                      <Link
                        href="/guides"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                      >
                        Guides
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                className="text-gray-600 font-semibold text-base hover:text-[#F43676] transition-colors duration-200"
              >
                Contact
              </Link>
            </div>

            {/* Social Icons - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <FaFacebookF className="text-xs" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <FaXTwitter className="text-xs" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <FaTelegramPlane className="text-xs" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <FaInstagram className="text-xs" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <FaYoutube className="text-xs" />
              </a>
            </div>

            {/* Dark Mode Toggle */}
            {/* <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
              <FaMoon className="text-sm" />
            </button> */}

            {/* Search Button */}
            <Link
              href="/search"
              className="w-8 h-8 rounded-full bg-[#F43676] flex items-center justify-center text-white hover:bg-[#e02a60] transition-colors"
            >
              <FaSearch className="text-xs" />
            </Link>

            {/* Login Button or User Profile */}
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 text-gray-700 font-medium text-sm hover:text-[#F43676] transition-colors duration-200 py-2 px-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Profile Picture with fallback */}
                  {user.profilePicture || user.photoURL ? (
                    <img
                      src={user.profilePicture || user.photoURL}
                      alt={user.name || "Profile"}
                      className="w-8 h-8 rounded-full border-2 border-[#F43676] object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F43676] to-[#e02a60] flex items-center justify-center text-white text-xs font-bold border-2 border-[#F43676]">
                      {(user.name || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:inline">{user.name || "Profile"}</span>
                </motion.button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                    >
                      <Link
                        href="/my-profile"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/my-petition"
                        className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Petitions
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#F43676] transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/login"
                  className="bg-[#F43676] text-white px-6 py-2.5 rounded-full font-semibold text-base hover:bg-[#e02a60] transition-colors duration-200 flex items-center gap-2"
                >
                  <FaUserCircle className="text-base" />
                  Login
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 py-4"
            >
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-[#F43676] font-medium text-sm py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/start-petition"
                  className="text-gray-600 font-medium text-sm py-2 hover:text-[#F43676]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start a Petition
                </Link>
                <Link
                  href="/my-petition"
                  className="text-gray-600 font-medium text-sm py-2 hover:text-[#F43676]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Petitions
                </Link>
                <Link
                  href="/currentpetitions"
                  className="text-gray-600 font-medium text-sm py-2 hover:text-[#F43676]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Current Petitions
                </Link>
                <Link
                  href="/successfulpetitions"
                  className="text-gray-600 font-medium text-sm py-2 hover:text-[#F43676]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Success Stories
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 font-medium text-sm py-2 hover:text-[#F43676]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 font-medium text-sm py-2 hover:text-[#F43676]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                {/* Social Icons for Mobile */}
                <div className="flex items-center gap-2 py-3 border-t border-gray-100 mt-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white"
                  >
                    <FaFacebookF className="text-xs" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white"
                  >
                    <FaXTwitter className="text-xs" />
                  </a>
                  <a
                    href="https://telegram.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white"
                  >
                    <FaTelegramPlane className="text-xs" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white"
                  >
                    <FaInstagram className="text-xs" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white"
                  >
                    <FaYoutube className="text-xs" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
