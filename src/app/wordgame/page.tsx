"use client";

import React, { useState, useEffect } from 'react';
import { wordData } from '../../utils/wordData'; // Ensure this path is correct
import { motion } from 'framer-motion';

interface WordItem {
  word: string;
  hint: string;
}

const WordGame: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [words, setWords] = useState<WordItem[]>(wordData[language] || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hint, setHint] = useState<string>('');
  const [userGuess, setUserGuess] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(3);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');

  useEffect(() => {
    const newWords = wordData[language] || [];
    setWords(newWords);
    setCurrentIndex(0);
    setUserGuess('');
    setAttempts(0);
    setScore(0);
    setFeedback(null);
    setShowNextButton(false);
    setCorrectAnswer('');

    if (newWords.length > 0) {
      const wordItem = newWords[0];
      setHint(wordItem.hint);
    }
  }, [language]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value);
  };

  const handleSubmit = () => {
    if (attempts < maxAttempts - 1) {
      const currentWord = words[currentIndex]?.word || '';

      // Remove spaces and compare
      const cleanedUserGuess = userGuess.replace(/\s+/g, '').toLowerCase();
      const cleanedCurrentWord = currentWord.replace(/\s+/g, '').toLowerCase();

      if (cleanedUserGuess === cleanedCurrentWord) {
        setScore(score + 1);
        setFeedback('Correct!');
        setCorrectAnswer('');
        setShowNextButton(true);
      } else {
        setAttempts(attempts + 1);
        if (attempts >= maxAttempts - 1) {
          setFeedback(`Incorrect! The correct word is: ${currentWord}`);
          setCorrectAnswer(currentWord);
          setShowNextButton(true);
        } else {
          setFeedback(`Incorrect! You have ${maxAttempts - (attempts + 1)} attempt(s) left.`);
        }
      }
    } else {
      // If the user has reached the maximum number of attempts
      const currentWord = words[currentIndex]?.word || '';
      setFeedback(`Incorrect! The correct word is: ${currentWord}`);
      setCorrectAnswer(currentWord);
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserGuess('');
      setAttempts(0);
      setHint(words[currentIndex + 1]?.hint || '');
      setFeedback(null);
      setShowNextButton(false);
      setCorrectAnswer('');
    } else {
      setFeedback(`You have completed the Word Game. Your score is ${score} out of ${words.length}.`);
    }
  };

  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-12 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <h1 className="text-3xl font-bold mb-6 text-center  text-white">Word Game</h1>
      <div className="w-full max-w-md bg-gray-800 bg-opacity-50 p-12 rounded-xl">
        
        <div className="mb-4 ">
          <div className='flex justify-between items-center'>
          <label htmlFor="language" className="block text-lg font-medium mb-2 text-white">Select Language:</label>
          <p className="mb-2 font-semibold text-white">Score: {score}</p>
          </div>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="border border-gray-500 bg-gray-800 bg-opacity-85 text-white p-2 rounded-lg w-full"
          >
            <option className='bg-gray-800 bg-opacity-85' value="en">English</option>
            <option className='bg-gray-800 bg-opacity-85' value="es">Spanish</option>
            <option className='bg-gray-800 bg-opacity-85' value="fr">French</option>
            <option className='bg-gray-800 bg-opacity-85' value="de">German</option>
            <option className='bg-gray-800 bg-opacity-85' value="it">Italian</option>
            <option className='bg-gray-800 bg-opacity-85' value="pt">Portuguese</option>
            <option className='bg-gray-800 bg-opacity-85' value="ru">Russian</option>
            <option className='bg-gray-800 bg-opacity-85' value="ja">Japanese</option>
            <option className='bg-gray-800 bg-opacity-85' value="zh">Chinese</option>
            <option className='bg-gray-800 bg-opacity-85' value="ar">Arabic</option>
            <option className='bg-gray-800 bg-opacity-85' value="ko">Korean</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-lg mb-2 text-white">Hint:</p>
          <p className="text-xl mb-4 font-medium text-center text-white">{hint}</p>
          <input
            type="text"
            value={userGuess}
            onChange={handleInputChange}
            placeholder="Type your guess here"
            className="border border-gray-500 text-white bg-gray-800 bg-opacity-50  p-2 rounded-lg mb-4 w-full outline-none"
          />
          <div className="mb-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={showNextButton}
            >
              Submit
            </button>
            {showNextButton && (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-green-500 text-white rounded ml-4"
              >
                Next Question
              </button>
            )}
          </div>
          {feedback && (
            <motion.div
              className={`mt-4 text-lg font-semibold text-center ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {feedback}
            </motion.div>
          )}
          {correctAnswer && !showNextButton && (
            <motion.div
              className="mt-4 text-lg font-semibold text-center text-green-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Correct Answer: {correctAnswer}
            </motion.div>
          )}
        </div>
        {words.length > 0 && (
          <div className="mt-4 text-lg font-semibold w-full">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span className='text-white'>Question {currentIndex + 1} of {words.length}</span>
                <span className='text-white'>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGame;
