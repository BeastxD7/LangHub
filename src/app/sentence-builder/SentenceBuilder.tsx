"use client";

import React, { useState, useEffect } from 'react';
import { sentenceData } from '../../utils/sentenceData';
import { motion } from 'framer-motion';

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
  const [language, setLanguage] = useState('en');
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
  const [correctAnswer, setCorrectAnswer] = useState<string>('');

  useEffect(() => {
    const newSentences: SentenceEntry[] = sentenceData[language] || [];
    // console.log('New Sentences:', newSentences); // Debugging line
    if (Array.isArray(newSentences)) {
      setSentences(newSentences);
      setCurrentIndex(0);
      setUserSentence([]);
      setAttempts(1);
      setScore(0);
      setFeedback(null);
      setCorrect(null);
      setShowNextButton(false);
      setCorrectAnswer('');

      if (newSentences.length > 0) {
        setJumbledSentence(getJumbledSentence(newSentences[0].words));
      }
    } else {
      console.error('Invalid sentence data format');
    }
  }, [language]);

  const getJumbledSentence = (words: string[]) => {
    return shuffleArray(words);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  const handleOptionClick = (word: string) => {
    const selectedCount = userSentence.filter(w => w === word).length;
    const jumbledCount = jumbledSentence.filter(w => w === word).length;
  
   
    if (userSentence.length < jumbledSentence.length && !showNextButton && selectedCount < jumbledCount) {
      setUserSentence(prev => [...prev, word]);
    }
  };
  
  const handleUndo = () => {
    if (!showNextButton) {
      setUserSentence(prev => prev.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    const userSentenceStr = userSentence.join(' ');
    const correctSentence = sentences[currentIndex]?.sentence || '';

    if (userSentenceStr === correctSentence) {
      setScore(score + 1);
      setFeedback('Correct!');
      setCorrect(true);
      setShowNextButton(true);
      setCorrectAnswer('');
    } else {
      if (attempts < maxAttempts) {
        setAttempts(attempts + 1);
        setFeedback(`Incorrect! You have ${maxAttempts - attempts} attempt(s) left.`);
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
      setJumbledSentence(getJumbledSentence(sentences[currentIndex + 1]?.words || []));
      setFeedback(null);
      setCorrect(null);
      setShowNextButton(false);
      setCorrectAnswer('');
    } else {
      setFeedback(`You have completed the sentence builder. Your score is ${score} out of ${sentences.length}.`);
      setShowNextButton(false);
    }
  };

  const progress = ((currentIndex + 1) / sentences.length) * 100;

  return (
  <>
    <h1 className="text-3xl font-bold mb-6 text-white">Sentence Builder</h1>
    <div className="flex flex-col items-center justify-center  max-h-screen p-10 bg-gray-800 bg-opacity-50 rounded-xl">
      
      <div className="mb-4 ">
        <label htmlFor="language" className="block text-lg font-medium mb-2 text-white">Select Language:</label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="border border-gray-500 bg-gray-800 bg-opacity-50 p-2 text-white rounded-lg"
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
          <option value="kn">Kannada</option>
          <option value="hi">Hindi</option>
        </select>
      </div>
      <div className="mb-4 ">
        {sentences.length > 0 && (
          <>
            <div className='flex justify-between items-center '>
            <p className="text-lg mb-2 text-white">Jumbled Sentence:</p>
            <p className='font-semibold text-white'>Score: {score}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {jumbledSentence.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(word)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {word}
                </button>
              ))}
            </div>
            <p className="text-lg mb-2 text-white">Your Sentence:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {userSentence.map((word, index) => (
                <span key={index} className="px-4 py-2 bg-gray-200 rounded">{word}</span>
              ))}
            </div>
            <div className="mb-4">
              <button
                onClick={handleUndo}
                className="px-4 py-2 bg-gray-500 text-white rounded"
                disabled={userSentence.length === 0 || showNextButton}
              >
                Undo
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded ml-4"
                disabled={userSentence.length !== jumbledSentence.length || showNextButton}
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
          </>
        )}
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
        {correctAnswer && (
          <motion.div
            className="mt-4 text-lg font-semibold text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Correct Answer: {correctAnswer}
          </motion.div>
        )}
      </div>
      <div className="mt-4 text-lg font-semibold w-full">
        {sentences.length > 0 && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span className='text-white'>Question {currentIndex + 1} of {sentences.length}</span>
                <span className='text-white'>{Math.round(progress)}%</span>
              </div>
            </div>
            
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default SentenceBuilder;
