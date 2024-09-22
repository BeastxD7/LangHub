"use client";

import React, { useState, useEffect } from "react";
import { vocabularyData } from "../../utils/vocabularyData";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import Navbar from "../../components/Navbar";

const VocabularyPage = () => {
  const [language, setLanguage] = useState("en");
  const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [showNextMessage, setShowNextMessage] = useState<boolean>(false);
  const [showFinalMessage, setShowFinalMessage] = useState<boolean>(false);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  const definitions =
    (
      vocabularyData as {
        [key: string]: { word: string; definition: string }[];
      }
    )[language] || [];

  useEffect(() => {
    setCurrentDefinitionIndex(0);
    setUserAnswer("");
    setFeedback(null);
    setScore(0);
    setTotalQuestions(definitions.length);
    setCorrect(null);
    setAttempts(0);
    setShowNextMessage(false);
    setShowFinalMessage(false);
    setInputDisabled(false);
  }, [language, definitions.length]);

  useEffect(() => {
    setAttempts(0);
    setInputDisabled(false);
  }, [currentDefinitionIndex]);

  const currentDefinition =
    definitions[currentDefinitionIndex]?.definition || "";
  const correctWord = definitions[currentDefinitionIndex]?.word || "";

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === correctWord.toLowerCase()) {
      setFeedback("Correct!");
      setScore(score + 1);
      setCorrect(true);
      setAttempts(0);
      setInputDisabled(true);

      setTimeout(() => {
        if (currentDefinitionIndex < definitions.length - 1) {
          setShowNextMessage(true);
          setTimeout(() => {
            setCurrentDefinitionIndex(currentDefinitionIndex + 1);
            setUserAnswer("");
            setFeedback(null);
            setCorrect(null);
            setShowNextMessage(false);
            setInputDisabled(false);
          }, 3000);
        } else {
          setShowFinalMessage(true);
        }
      }, 1000);
    } else {
      if (attempts < 2) {
        setAttempts(attempts + 1);
        setFeedback(
          `Incorrect! Try again. You have ${2 - attempts} attempts left.`
        );
        setCorrect(false);
      } else {
        setFeedback(`Incorrect! The correct word is ${correctWord}.`);
        setCorrect(false);
        setInputDisabled(true);

        setTimeout(() => {
          setShowNextMessage(true);
          setTimeout(() => {
            if (currentDefinitionIndex < definitions.length - 1) {
              setCurrentDefinitionIndex(currentDefinitionIndex + 1);
              setUserAnswer("");
              setFeedback(null);
              setCorrect(null);
              setShowNextMessage(false);
              setInputDisabled(false);
            } else {
              setShowFinalMessage(true);
            }
          }, 3000);
        }, 2000);
      }
    }
  };

  const progress = ((currentDefinitionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-12 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <Navbar />  
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-gray-800 bg-opacity-50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white text-center">Vocabulary Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label htmlFor="language" className="block text-lg font-medium mb-2 text-white">
                Select Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                key={currentDefinitionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {definitions.length > 0 && currentDefinition ? (
                  <>
                    <p className="text-lg mb-4  text-white">Definition: {currentDefinition}</p>
                    <Input 
                      type="text"
                      value={userAnswer}
                      onChange={handleAnswerChange}
                      placeholder="Type your answer here"
                      className="mb-4 bg-gray-800 bg-opacity-50 text-white outline-none border border-gray-600 p-2 rounded-md w-full" 
                      disabled={inputDisabled}
                    />
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-purple-600"
                      disabled={inputDisabled}
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <p className="text-white">No definitions available. Please select a language.</p>
                )}
              </motion.div>
            </AnimatePresence>
            {feedback && (
              <motion.div
                className={`mt-4 text-lg font-semibold ${
                  correct === true
                    ? "text-green-500"
                    : correct === false
                    ? "text-red-500"
                    : ""
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {feedback}
              </motion.div>
            )}
            {showNextMessage && (
              <motion.div
                className="mt-4 text-lg font-semibold text-blue-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Moving to next question...
              </motion.div>
            )}
            {showFinalMessage && (
              <motion.div
                className="mt-4 text-lg font-semibold text-blue-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                You have completed the vocabulary builder. Your score is {score} out of {totalQuestions}.
              </motion.div>
            )}
            {definitions.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                  <span>Question {currentDefinitionIndex + 1} of {totalQuestions}</span>
                  <span>Score: {score}</span>
                </div>
                <Progress   value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VocabularyPage;