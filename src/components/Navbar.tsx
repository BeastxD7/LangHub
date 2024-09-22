"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const features = [
  { title: "WordMaster", route: "/wordmaster" },
  { title: "Translation Tool", route: "/translate-language" },
  { title: "Word Scribble", route: "/scribble" },
  { title: "Vocabulary Builder", route: "/vocabulary" },
  { title: "Sentence Builder", route: "/sentence-builder" },
  { title: "Language Quiz", route: "/language-quiz" },
  { title: "Chat with Translation", route: "/chat" }
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-gray-800 bg-opacity-50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-white">LangHub</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white hover:text-purple-300 transition-colors"
                >
                  Features <ChevronDown className="ml-1" />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                    >
                      {features.map((feature) => (
                        <Link
                          key={feature.title}
                          href={feature.route}
                        >
                          <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors">
                            {feature.title}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-300 focus:outline-none"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800 bg-opacity-95"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.route}
                >
                  <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-gray-700 transition-colors" onClick={toggleMenu}>
                    {feature.title}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;