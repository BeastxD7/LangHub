"use client";

import { useState, useEffect } from 'react';
import { translatePhrases } from './translate';
import LanguageSelector from './LanguageSelector';

interface Question {
  phrase: string;
  options: string[];
  correctAnswer: string;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (language) {
      const fetchQuestions = async () => {
        setLoading(true);
        try {
          const phrases = ['Hello', 'Thank you', 'Goodbye', 'Please'];
          const questions = await translatePhrases(phrases, language);
          setQuestions(questions);
        } catch (err) {
          console.error('Error fetching questions:', err);
          setError('Failed to fetch quiz questions.');
        } finally {
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [language]);

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex]?.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      alert(`Quiz completed! Your score is ${score} out of ${questions.length}`);
    }
  };

  const question = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!language ? (
        <LanguageSelector onSelectLanguage={handleLanguageSelect} />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Language Quiz</h1>
          {loading ? (
            <p>Loading questions...</p>
          ) : (
            <>
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  {question ? (
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold">Translate: {question.phrase}</h2>
                      <div className="mt-4">
                        {question.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className={`block px-4 py-2 mb-2 rounded ${
                              selectedAnswer === option
                                ? option === question.correctAnswer
                                  ? 'bg-green-500 text-white'
                                  : 'bg-red-500 text-white'
                                : 'bg-gray-200'
                            }`}
                          >
                            {option || 'Option Not Available'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>No questions available.</p>
                  )}
                  <button
                    onClick={nextQuestion}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={selectedAnswer === null}
                  >
                    Next Question
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
