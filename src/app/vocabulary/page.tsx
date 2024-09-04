"use client";

import React, { useState, useEffect } from 'react';
import { vocabularyData } from '../../utils/vocabularyData';
import { motion } from 'framer-motion'; // For animations

const VocabularyPage = () => {
  const [language, setLanguage] = useState('en');
  const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState<number>(0); // Track number of attempts
  const [showNextMessage, setShowNextMessage] = useState<boolean>(false); // Show moving to next question message
  const [showFinalMessage, setShowFinalMessage] = useState<boolean>(false); // Show final message display
  const [inputDisabled, setInputDisabled] = useState<boolean>(false); // Disable input field after 3 attempts

  const definitions = vocabularyData[language] || [];

  useEffect(() => {
    setCurrentDefinitionIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setScore(0);
    setTotalQuestions(definitions.length);
    setCorrect(null);
    setAttempts(0); // Reset attempts when language changes
    setShowNextMessage(false); // Reset next message display
    setShowFinalMessage(false); // Reset final message display
    setInputDisabled(false); // Enable input field initially
  }, [language, definitions.length]); // Added definitions.length here

  useEffect(() => {
    setAttempts(0); // Reset attempts when moving to a new question
    setInputDisabled(false); // Enable input field for new question
  }, [currentDefinitionIndex]);

  const currentDefinition = definitions[currentDefinitionIndex]?.definition || '';
  const correctWord = definitions[currentDefinitionIndex]?.word || '';

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === correctWord.toLowerCase()) {
      setFeedback('Correct!');
      setScore(score + 1);
      setCorrect(true);
      setAttempts(0); // Reset attempts on correct answer
      setInputDisabled(true); // Disable input field on correct answer

      setTimeout(() => {
        if (currentDefinitionIndex < definitions.length - 1) {
          setShowNextMessage(true);
          setTimeout(() => {
            setCurrentDefinitionIndex(currentDefinitionIndex + 1);
            setUserAnswer('');
            setFeedback(null);
            setCorrect(null);
            setShowNextMessage(false); // Hide next message
            setInputDisabled(false); // Enable input field for next question
          }, 3000); // Delay for moving to next question message
        } else {
          setShowFinalMessage(true); // Show final message when all questions are completed
        }
      }, 1000); // Delay to show "Correct!" animation
    } else {
      if (attempts < 2) {
        setAttempts(attempts + 1);
        setFeedback(`Incorrect! Try again. You have ${2 - attempts} attempts left.`);
        setCorrect(false);
      } else {
        setFeedback(`Incorrect! The correct word is ${correctWord}.`);
        setCorrect(false);
        setInputDisabled(true); // Disable input field after 3 attempts

        setTimeout(() => {
          setShowNextMessage(true);
          setTimeout(() => {
            if (currentDefinitionIndex < definitions.length - 1) {
              setCurrentDefinitionIndex(currentDefinitionIndex + 1);
              setUserAnswer('');
              setFeedback(null);
              setCorrect(null);
              setShowNextMessage(false); // Hide next message
              setInputDisabled(false); // Enable input field for next question
            } else {
              setShowFinalMessage(true); // Show final message when all questions are completed
            }
          }, 3000); // Delay to show moving to next question message
        }, 2000); // Delay to show the correct answer before moving to the next question
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Vocabulary Builder</h1>
      <div className="mb-4">
        <label htmlFor="language" className="block text-lg font-medium mb-2">Select Language:</label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="border border-gray-300 p-2 rounded-md"
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
      <div className="mb-4 w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {definitions.length > 0 && currentDefinition ? (
          <>
            <p className="text-lg mb-2">Definition: {currentDefinition}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={handleAnswerChange}
              placeholder="Type your answer here"
              className="border border-gray-300 p-2 rounded-md w-full"
              disabled={inputDisabled} // Disable input field based on state
            />
            <button
              onClick={handleSubmit}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full"
              disabled={inputDisabled} // Disable button based on state
            >
              Submit
            </button>
          </>
        ) : (
          <p>No definitions available. Please select a language.</p>
        )}
      </div>
      {feedback && (
        <motion.div
          className={`mt-4 text-lg font-semibold ${correct === true ? 'text-green-500' : correct === false ? 'text-red-500' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {feedback}
        </motion.div>
      )}
      {showNextMessage && (
        <motion.div
          className="mt-4 text-lg font-semibold text-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Moving to next question...
        </motion.div>
      )}
      {showFinalMessage && (
        <motion.div
          className="mt-4 text-lg font-semibold text-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Congratulations! You have completed the vocabulary builder. Your score is {score} out of {totalQuestions}.
        </motion.div>
      )}
      <div className="mt-4 text-lg font-semibold">
        {definitions.length > 0 && (
          <p>Question {currentDefinitionIndex + 1} of {totalQuestions}</p>
        )}
      </div>
      <div className="mt-2 text-lg font-semibold">
        {definitions.length > 0 && (
          <p>Score: {score}</p>
        )}
      </div>
    </div>
  );
};

export default VocabularyPage;
