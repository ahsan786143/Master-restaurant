"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-500 via-blue-600 to-blue-700 text-white py-10 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://png.pngtree.com/png-clipart/20250106/original/pngtree-orange-delivery-man-on-motorcycle-png-image_20086589.png"
              alt="DFC Logo"
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-xl font-extrabold tracking-wide">
              DFC Restaurant
            </h2>
          </div>
          <p className="text-sm text-white/80 text-center md:text-left">
            Fresh, Fast & Delivered to your doorstep.  
            Taste the best with us!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link
              href="/"
              className="hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-yellow-300 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-yellow-300 transition duration-300"
            >
              Contact
            </Link>
            <Link
              href="/menu"
              className="hover:text-yellow-300 transition duration-300"
            >
              Menu
            </Link>
          </nav>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} DFC Restaurant. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
