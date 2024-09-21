"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const LanguageQuizPage = () => {
  const [language, setLanguage] = useState('en');  // Default language
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Load questions from external file (public/questions.json)
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/questions.json'); // Ensure this path is correct
      const data = await response.json();
      setQuestions(data[language].slice(0, 6));  // Only take 6 questions
    };
    fetchQuestions();
  }, [language]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);  // Finish the quiz when last question is answered
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg p-8"
      >
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Language Quiz</h1>

        {/* Language Selection */}
        <div className="mb-8">
          <label htmlFor="language" className="block text-lg font-medium text-gray-200 mb-2">Select your language:</label>
          <select 
            id="language" 
            value={language} 
            onChange={handleLanguageChange} 
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
    <option value="en">English</option>
    <option value="fr">French</option>
    <option value="ar">Arabic</option>
    <option value="zh">Chinese</option>
    <option value="es">Spanish</option>
    <option value="hi">Hindi</option>
    <option value="bn">Bengali</option>
    <option value="pt">Portuguese</option>
    <option value="ru">Russian</option>
    <option value="ja">Japanese</option>
    <option value="yue">Cantonese</option>
    <option value="vi">Vietnamese</option>
    <option value="tr">Turkish</option>
    <option value="wu">Shanghainese</option>
    <option value="mr">Marathi</option>
    <option value="te">Telugu</option>
    <option value="ur">Urdu</option>
    <option value="pa">Punjabi</option>
    <option value="ko">Korean</option>
    <option value="ta">Tamil</option>
          </select>
        </div>

        {/* Quiz Questions */}
        <AnimatePresence mode="wait">
          {!isQuizFinished ? (
            questions.length > 0 ? (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-white">{questions[currentQuestionIndex].question}</h2>
                <ul className="space-y-4">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full p-4 text-left rounded-md transition-colors duration-300 ${
                          selectedAnswer === option 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {option}
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Progress bar */}
                <div className="mt-8">
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
                    <motion.div 
                      className="bg-purple-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-gray-300 text-sm">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </p>
                </div>

                <motion.button
                  onClick={handleNextQuestion}
                  className="w-full bg-purple-600 text-white p-4 rounded-md mt-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedAnswer}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next <ArrowRight className="ml-2" />
                </motion.button>
              </motion.div>
            ) : (
              <p className="text-white text-center">Loading questions...</p>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Quiz Finished!</h2>
              <p className="text-xl text-gray-300 mb-6">Your score: {score} out of {questions.length}</p>
              <motion.button 
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setIsQuizFinished(false);
                }} 
                className="bg-purple-600 text-white p-4 rounded-md inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Restart Quiz <ArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score display */}
        {!isQuizFinished && (
          <motion.div 
            className="mt-6 flex items-center justify-between text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center">
              <Check className="text-green-500 mr-2" />
              <span>{score} correct</span>
            </div>
            <div className="flex items-center">
              <X className="text-red-500 mr-2" />
              <span>{currentQuestionIndex - score} incorrect</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LanguageQuizPage;