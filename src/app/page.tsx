"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../components/ui/button";
import SparklesText from "../components/magicui/sparkles-text";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import TypingEffect from "../components/TypingEffect";
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import FeatureShowcase from '../components/FeatureShowcase';

const features = [
  {
    title: "WordMaster",
    description: "Guess words from hints in multiple languages.",
    content: "WordMaster is an engaging game that challenges you to guess words based on provided hints. With support for multiple languages, it's perfect for language learners of all levels. Expand your vocabulary, improve your language skills, and enjoy the thrill of word discovery.",
    image: "/wordmaster.png",
    route: "/wordmaster"
  },
  {
    title: "Translation Tool",
    description: "Translate text and files with ease.",
    content: "Our Translation Tool is a powerful utility that allows you to translate not just text, but also a variety of file formats. Whether you're working with documents, presentations, or web pages, our tool has got you covered. Experience seamless translation across languages and file types.",
    image: "/translation-tool.png",
    route: "/translate-language"
  },
  {
    title: "Word Scribble",
    description: "Real-time word guessing game with friends.",
    content: "Word Scribble brings the excitement of real-time word guessing to your fingertips. Create your own game rooms or join existing ones to play with friends or language enthusiasts worldwide. This game is perfect for improving your language skills while having a blast with others.",
    image: "/word-scribble.png",
    route: "/scribble"
  },
  {
    title: "Vocabulary Builder",
    description: "Enhance your vocabulary with our guessing game.",
    content: "Our Vocabulary Builder is designed to supercharge your word power. Through an engaging guessing game format, you'll encounter new words, learn their meanings, and reinforce your memory. With support for multiple languages, you can expand your vocabulary in your native tongue or any language you're learning.",
    image: "/vocabulary-builder.png",
    route: "/vocabulary"
  },
  {
    title: "Sentence Builder",
    description: "Arrange jumbled words to form correct sentences.",
    content: "Sentence Builder is your go-to tool for mastering sentence structure. We present you with jumbled words, and your task is to arrange them into proper sentences. This exercise enhances your understanding of grammar, word order, and sentence flow. Available in multiple languages, it's an excellent way to improve your writing and comprehension skills.",
    image: "/sentence-builder.png",
    route: "/sentence-builder"
  },
  {
    title: "Language Quiz",
    description: "Test your grammar and language understanding.",
    content: "Put your language skills to the test with our Language Quiz feature. Covering grammar, vocabulary, and language usage, these quizzes are designed to challenge and improve your overall language proficiency. With questions available in multiple languages, you can assess and enhance your skills in any language you're learning.",
    image: "/language-quiz.png",
    route: "/language-quiz"
  },
  {
    title: "Chat with Translation",
    description: "Real-time chat with automatic translation.",
    content: "Break down language barriers with our Chat with Translation feature. Engage in real-time conversations with people around the world, and let our automatic translation take care of the rest. Whether you're practicing a new language or need to communicate with someone who speaks a different language, this tool makes cross-language communication seamless and effortless.",
    image: "/chat-translation.png",
    route: "/chat"
  },
];

export default function LangHubLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const toggleDropdown = useCallback(() => setIsDropdownOpen(prev => !prev), []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-gray-900 bg-opacity-90 backdrop-blur-sm' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold">LangHub</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-white hover:text-purple-300 transition-colors"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
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
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex items-center justify-center md:hidden"
          >
            <div className="text-center">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={feature.route}>
                    <span className="block py-2 text-xl hover:text-purple-400 transition-colors" onClick={toggleMenu}>
                      {feature.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-col items-center justify-center pt-16">
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 max-w-7xl mx-auto text-center lg:text-left"
          >
            {/* Text content */}
            <div className="lg:w-1/2 flex flex-col justify-center items-center mt-8 md:mt-0">
              <SparklesText className="text-5xl sm:text-7xl font-bold mb-6" text="LangHub" />

              <TextGenerateEffect
                className="text-xl sm:text-2xl text-gray-300 mb-8"
                words="Immerse yourself in exciting language learning experiences and enhance your skills!"
              />

              <div className="h-14">
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
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <Image 
                src="/hero.png"
                alt="Language Learning Illustration"
                width={900}
                height={400}
                className="rounded-lg"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
              />
            </div>
          </motion.div>
        </section>

        {/* Features Section with FeatureShowcase */}
        <section className="w-full min-h-screen py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <FeatureShowcase features={features} />
        </section>
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
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2023 LangHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}