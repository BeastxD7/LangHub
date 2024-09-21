"use client";

import React, { useState, useEffect } from "react";
import { wordData } from "../../utils/wordData"; // Ensure this path is correct
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, Globe, Brain, Trophy, Zap } from 'lucide-react';

interface WordItem {
  word: string;
  hint: string;
}

const WordGame: React.FC = () => {
  const [language, setLanguage] = useState("en");
  const [words, setWords] = useState<WordItem[]>(wordData[language] || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hint, setHint] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(3);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  useEffect(() => {
    const newWords = wordData[language] || [];
    setWords(newWords);
    setCurrentIndex(0);
    setUserGuess("");
    setAttempts(0);
    setScore(0);
    setFeedback(null);
    setShowNextButton(false);
    setCorrectAnswer("");

    if (newWords.length > 0) {
      const wordItem = newWords[0];
      setHint(wordItem.hint);
    }
  }, [language]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value);
  };

  const handleSubmit = () => {
    if (attempts < maxAttempts - 1) {
      const currentWord = words[currentIndex]?.word || "";

      // Remove spaces and compare
      const cleanedUserGuess = userGuess.replace(/\s+/g, "").toLowerCase();
      const cleanedCurrentWord = currentWord.replace(/\s+/g, "").toLowerCase();

      if (cleanedUserGuess === cleanedCurrentWord) {
        setScore(score + 1);
        setFeedback("Correct!");
        setCorrectAnswer("");
        setShowNextButton(true);
      } else {
        setAttempts(attempts + 1);
        if (attempts >= maxAttempts - 1) {
          setFeedback(`Incorrect! The correct word is: ${currentWord}`);
          setCorrectAnswer(currentWord);
          setShowNextButton(true);
        } else {
          setFeedback(
            `Incorrect! You have ${
              maxAttempts - (attempts + 1)
            } attempt(s) left.`
          );
        }
      }
    } else {
      // If the user has reached the maximum number of attempts
      const currentWord = words[currentIndex]?.word || "";
      setFeedback(`Incorrect! The correct word is: ${currentWord}`);
      setCorrectAnswer(currentWord);
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserGuess("");
      setAttempts(0);
      setHint(words[currentIndex + 1]?.hint || "");
      setFeedback(null);
      setShowNextButton(false);
      setCorrectAnswer("");
    } else {
      setFeedback(
        `You have completed the Word Game. Your score is ${score} out of ${words.length}.`
      );
    }
  };

  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 md:p-8 w-full flex items-center justify-center h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12"
        >
          <h1 className="text-4xl font-bold mb-8 text-center text-white">
            Word Game
          </h1>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <label
                htmlFor="language"
                className="block text-lg font-medium text-white"
              >
                Select Language:
              </label>
              <motion.p 
                className="font-semibold text-white text-xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                Score: {score}
              </motion.p>
            </div>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
              <option value="ar">Arabic</option>
              <option value="ko">Korean</option>
            </select>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <p className="text-lg mb-2 text-gray-300">Hint:</p>
                <p className="text-2xl mb-4 font-medium text-center text-white">
                  {hint}
                </p>
                <input
                  type="text"
                  value={userGuess}
                  onChange={handleInputChange}
                  placeholder="Type your guess here"
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-center space-x-4 mb-6">
                <motion.button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-purple-600 text-white rounded-md disabled:opacity-50"
                  disabled={showNextButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
                {showNextButton && (
                  <motion.button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-green-500 text-white rounded-md flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Question <ArrowRight className="ml-2" />
                  </motion.button>
                )}
              </div>
              {feedback && (
                <motion.div
                  className={`mb-4 text-lg font-semibold text-center ${
                    feedback.includes("Correct") ? "text-green-400" : "text-red-400"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {feedback}
                </motion.div>
              )}
              {correctAnswer && !showNextButton && (
                <motion.div
                  className="mb-4 text-lg font-semibold text-center text-green-400"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Correct Answer: {correctAnswer}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
          {words.length > 0 && (
            <div className="mt-6">
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                <motion.div
                  className="bg-purple-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-400">
                <span>Question {currentIndex + 1} of {words.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          )}
        </motion.div>

        
       
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({
  icon: Icon,
  title,
  description,
}) => (
  <motion.div
    className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="w-12 h-12 text-purple-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default WordGame;