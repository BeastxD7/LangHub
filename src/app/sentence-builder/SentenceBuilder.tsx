"use client";

import React, { useState, useEffect } from "react";
import { sentenceData } from "../../utils/sentenceData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import Navbar from "../../components/Navbar"; 

interface SentenceEntry {
  sentence: string;
  words: string[];
}

interface SentenceData {
  [language: string]: SentenceEntry[];
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const SentenceBuilder: React.FC = () => {
  const [language, setLanguage] = useState("en");
  const [sentences, setSentences] = useState<SentenceEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jumbledSentence, setJumbledSentence] = useState<string[]>([]);
  const [userSentence, setUserSentence] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(1);
  const [maxAttempts] = useState(3);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  useEffect(() => {
    const newSentences: SentenceEntry[] = sentenceData[language] || [];
    if (Array.isArray(newSentences)) {
      setSentences(newSentences);
      setCurrentIndex(0);
      setUserSentence([]);
      setAttempts(1);
      setScore(0);
      setFeedback(null);
      setCorrect(null);
      setShowNextButton(false);
      setCorrectAnswer("");

      if (newSentences.length > 0) {
        setJumbledSentence(getJumbledSentence(newSentences[0].words));
      }
    } else {
      console.error("Invalid sentence data format");
    }
  }, [language]);

  const getJumbledSentence = (words: string[]) => {
    return shuffleArray(words);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  const handleOptionClick = (word: string) => {
    const selectedCount = userSentence.filter((w) => w === word).length;
    const jumbledCount = jumbledSentence.filter((w) => w === word).length;

    if (
      userSentence.length < jumbledSentence.length &&
      !showNextButton &&
      selectedCount < jumbledCount
    ) {
      setUserSentence((prev) => [...prev, word]);
    }
  };

  const handleUndo = () => {
    if (!showNextButton) {
      setUserSentence((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    const userSentenceStr = userSentence.join(" ");
    const correctSentence = sentences[currentIndex]?.sentence || "";

    if (userSentenceStr === correctSentence) {
      setScore(score + 1);
      setFeedback("Correct!");
      setCorrect(true);
      setShowNextButton(true);
      setCorrectAnswer("");
    } else {
      if (attempts < maxAttempts) {
        setAttempts(attempts + 1);
        setFeedback(
          `Incorrect! You have ${maxAttempts - attempts} attempt(s) left.`
        );
        setCorrect(false);
      } else {
        setFeedback(`Incorrect! `);
        setCorrectAnswer(correctSentence);
        setShowNextButton(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserSentence([]);
      setAttempts(1);
      setJumbledSentence(
        getJumbledSentence(sentences[currentIndex + 1]?.words || [])
      );
      setFeedback(null);
      setCorrect(null);
      setShowNextButton(false);
      setCorrectAnswer("");
    } else {
      setFeedback(
        `You have completed the sentence builder. Your score is ${score} out of ${sentences.length}.`
      );
      setShowNextButton(false);
    }
  };

  const progress = ((currentIndex + 1) / sentences.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-12 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl">
        <Card className="bg-gray-800 bg-opacity-50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white text-center">
              Sentence Builder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label
                htmlFor="language"
                className="block text-lg font-medium mb-2 text-white">
                Select Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
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
                <option value="kn">Kannada</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            {sentences.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        Jumbled Sentence:
                      </h3>
                      <p className="text-lg font-semibold text-purple-400">
                        Score: {score}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {jumbledSentence.map((word, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleOptionClick(word)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}>
                          {word}
                        </motion.button>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Your Sentence:
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6 min-h-[50px] p-2 bg-gray-700 rounded-md">
                      {userSentence.map((word, index) => (
                        <motion.span
                          key={index}
                          className="px-4 py-2 bg-purple-600 text-white rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}>
                          {word}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <Button
                        onClick={handleUndo}
                        disabled={userSentence.length === 0 || showNextButton}
                        variant="secondary">
                        Undo
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={
                          userSentence.length !== jumbledSentence.length ||
                          showNextButton
                        }>
                        Submit
                      </Button>
                      {showNextButton && (
                        <Button onClick={handleNextQuestion} variant="default">
                          Next Question
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  className={`mt-4 text-lg font-semibold ${
                    correct === true
                      ? "text-green-500"
                      : correct === false
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}>
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {correctAnswer && (
                <motion.div
                  className="mt-4 text-lg font-semibold text-green-500"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}>
                  Correct Answer: {correctAnswer}
                </motion.div>
              )}
            </AnimatePresence>
            {sentences.length > 0 && (
              <div className="mt-6">
                <Progress value={progress} className="h-2 mb-2" />
                <div className="flex justify-between text-sm font-medium text-gray-400">
                  <span>
                    Question {currentIndex + 1} of {sentences.length}
                  </span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SentenceBuilder;
