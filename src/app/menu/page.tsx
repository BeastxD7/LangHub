"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Link from "next/link"; // for routing
import { Globe, Users, Zap, Brain, Trophy, Sparkles, MessageCircle  } from "lucide-react";


const features = [
  {
    title: "Word Game",
    description:
      "Engage in interactive word puzzles to challenge your language skills. Match words, find hidden terms, and more through fun and competitive gameplay.",
    icon: Globe,
    badge: "Popular",
    link: "/wordgame",
  },
  {
    title: "Translation Tool",
    description:
      "Translate text between multiple languages seamlessly. Perfect for learners seeking to improve their language comprehension and translation accuracy.",
    icon: Users,
    link: "/translate-language",
  },
  {
    title: "Word Scribble",
    description:
      "A fast-paced multiplayer game where players compete to guess the word based on scribbled clues. Challenge friends or others in real-time word-guessing fun",
    icon: Zap,
    badge: "Multiplayer",
    link: "/scribble",
  },
  {
    title: "Vocabulary",
    description:
      "Build and expand your vocabulary with curated word lists. Learn new words daily, practice them, and solidify your understanding through practical usage.",
    icon: Brain,
    link: "/vocabulary",
  },
  {
    title: "Sentence Builder",
    description:
      " Improve your sentence construction skills by piecing together words to form coherent and grammatically correct sentences. Ideal for learners at any level.",
    icon: Trophy,
    link: "/sentence-builder",
  },
  {
    title: "Language Quiz",
    description:
      "Test your knowledge of languages with quizzes covering vocabulary, grammar, and sentence structure. Track your progress and enhance your proficiency.",
    icon: Sparkles,
    link: "/quiz",
  },
  {
    title: "Chat with Translation",
    description:
      "Send and receive messages in different languages. Messages are automatically translated into your preferred language.",
    icon: MessageCircle ,
    link: "/chat",
  },
];

export default function LangHubFeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6 sm:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
          LangHub Features
        </h1>
        <p className="text-xl text-gray-300 mb-10 text-center max-w-3xl mx-auto">
          Discover the innovative features that make LangHub the ultimate
          platform for language learning and practice.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Card className="bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <feature.icon className="h-8 w-8 text-purple-400 mb-2" />
                  {feature.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-600 text-white">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="w-full h-1 bg-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </CardContent>
              <CardFooter>
                <Link
                  href={feature.link}
                  className="mt-4 inline-block bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition">
                  Try Now
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}></motion.div>
    </div>
  );
}
