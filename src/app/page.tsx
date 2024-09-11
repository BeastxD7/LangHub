"use client";

import SparklesText from "../components/magicui/sparkles-text";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import React from "react";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import TypingEffect from '../components/TypingEffect';

export default function LangHubDarkModernLandingPageTypewriter() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const controls = useAnimation();

  const words = ` Immerse yourself in exciting multiplayer word games and enhance your language skills!`;

  const features = [
    "Learn multiple languages",
    "Challenge friends worldwide",
    "Enjoy real-time gameplay",
    "Improve your vocabulary",
    "Track your progress",
    "Have fun while learning"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative backdrop-blur-md bg-gray-800 bg-opacity-30 p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-700"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >   
          
          <SparklesText className="text-white" text="LangHub" />
          
          <TextGenerateEffect className="text-xl sm:text-2xl text-white mb-8" filter={true} words={words} />

          <div className="h-10 w-auto text-center justify-center relative">
            <TypingEffect features={features} />
          </div>

          <Link href="/menu">
            <Button 
              size="lg" 
              className="relative bg-purple-600 rounded-xl mt-4 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 z-50"
              style={{ padding: '12px 24px', fontSize: '18px' }} // Increase button size for better tap target
            >
              Get Started!
            </Button>
          </Link>

        </motion.div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-20"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-20"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-violet-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 z-20"></div>
      </motion.div>

    </div>
  );
}
