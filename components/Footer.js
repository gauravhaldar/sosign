"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#f9f9f9] to-[#e0e0e0] text-gray-700 pt-12 px-6 border-t border-gray-300 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/press" className="hover:underline">Press</Link></li>
            <li><Link href="/advertise" className="hover:underline">Advertise</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/guides" className="hover:underline">Guides</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                X
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Branding Section */}
      <div className="border-t pt-6 text-center text-sm text-gray-600">
        <p>© 2025, <span className="font-semibold">Sosign</span></p>
        <p className="mt-2 text-xs">
          All rights reserved. Developed by Haldar AI & IT.
        </p>
      </div>
    </footer>
  );
}
