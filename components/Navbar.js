"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { FaUserCircle } from "react-icons/fa"; // Import FaUserCircle

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const { user, logout } = useAuth(); // Use the authentication hook

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false); // Close dropdown on logout
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white/95 backdrop-blur-md shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo + Links */}
          <div className="flex items-center gap-8">
            {/* Logo Image */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link href="/">
                <Image
                  src="/log.png"
                  alt="SOSIGN Logo"
                  width={100}
                  height={30}
                  className="h-7 w-auto"
                />
              </Link>
            </motion.div>

            {/* My Petition link */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/my-petition"
                className="text-gray-700 font-semibold text-base hover:text-teal-600 transition-colors duration-200 py-2 px-1"
              >
                My Petition
              </Link>
            </motion.div>
          </div>

          {/* Right side: Buttons */}
          <div className="flex items-center gap-6">
            {/* Start a Petition */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/start-petition"
                className="bg-teal-600 text-white px-6 py-2.5 rounded-full font-semibold text-base hover:bg-[#3650AD] transition-colors duration-200"
              >
                Start a Petition
              </Link>
            </motion.div>

            {user ? (
              <div className="relative">
                <motion.button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 text-gray-700 font-semibold text-base hover:text-teal-600 transition-colors duration-200 py-2 px-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUserCircle className="text-2xl" />
                  {user.name || "Profile"}
                </motion.button>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10"
                  >
                    <Link
                      href="/my-profile"
                      className="block px-4 py-2.5 text-gray-800 font-medium text-base hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2.5 text-gray-800 font-medium text-base hover:bg-gray-100 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/login"
                  className="text-gray-700 font-semibold text-base hover:text-teal-600 transition-colors duration-200 py-2 px-1"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
