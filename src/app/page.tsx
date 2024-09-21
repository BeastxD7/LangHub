"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../components/ui/button";
import SparklesText from "../components/magicui/sparkles-text";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import TypingEffect from "../components/TypingEffect";
import { Menu, X } from 'lucide-react';

const features = [
  "WordMaster",
  "Translation Tool",
  "Word Scribble",
  "Vocabulary Builder",
  "Sentence Builder",
  "Language Quiz",
  "Chat with Translation",
];

export default function LangHubLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white overflow-hidden">

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex items-center justify-center"
          >
            <div className="text-center">
              {features.map((feature) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/${feature.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="block py-2 text-xl hover:text-purple-400 transition-colors" onClick={toggleMenu}>
                      {feature}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <SparklesText className="text-5xl sm:text-7xl font-bold mb-6" text="LangHub" />

          <TextGenerateEffect
            className="text-xl sm:text-2xl text-gray-300 mb-8"
            words="Immerse yourself in exciting language learning experiences and enhance your skills!"
          />

          <div className="h-20 mb-12">
            <TypingEffect features={[
              "Learn multiple languages",
              "Challenge friends worldwide",
              "Enjoy real-time gameplay",
              "Improve your vocabulary",
              "Track your progress",
              "Have fun while learning",
            ]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg rounded-full"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>


      {/* Animated background elements */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-violet-700 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}