"use client";
import { useState, useEffect } from 'react';
import { translatePhrases } from './translate';
import LanguageSelector from './LanguageSelector';
import { phrases } from '../../utils/phraseData'; // Import the phrases

interface Question {
  phrase: string;
  options: string[];
  correctAnswer: string;
}

const getRandomPhrases = (num: number) => {
  const shuffled = phrases.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (language) {
      const fetchQuestions = async () => {
        setLoading(true);
        try {
          const selectedPhrases = getRandomPhrases(10); // Get 10 random phrases
          const questions = await translatePhrases(selectedPhrases, language);
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
    const question = questions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(answer);
    setCorrectAnswer(question.correctAnswer);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 lg:p-12 bg-gray-100">
      {!language ? (
        <LanguageSelector onSelectLanguage={handleLanguageSelect} />
      ) : (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Language Quiz</h1>
          {loading ? (
            <p className="text-center text-lg">Loading questions...</p>
          ) : (
            <>
              {error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <>
                  {quizCompleted ? (
                    <div className="text-center">
                      <h2 className="text-xl font-semibold mb-4">Quiz Completed!</h2>
                      <p className="text-lg font-semibold">Your score: {score} out of {questions.length}</p>
                    </div>
                  ) : (
                    <>
                      {question ? (
                        <div className="mb-6">
                          <div className='flex justify-between items-center'>
                          <h2 className="text-xl font-semibold mb-4">Translate: {question.phrase}</h2>
                          <p className="text-right font-semibold text-lg">Score: {score}</p>
                          </div>
                          <div className="space-y-2 mb-4">
                            {question.options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className={`w-full px-4 py-2 rounded text-left ${
                                  selectedAnswer === option
                                    ? option === question.correctAnswer
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                    : 'bg-gray-200'
                                }`}
                                disabled={selectedAnswer !== null}
                              >
                                {option || 'Option Not Available'}
                              </button>
                            ))}
                          </div>
                          {selectedAnswer && (
                            <div className="text-center mb-4">
                              {selectedAnswer !== correctAnswer && (
                                <p className="text-red-500 mb-2">Incorrect. The correct answer is: {correctAnswer}</p>
                              )}
                              <button
                                onClick={nextQuestion}
                                className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                              >
                                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-center text-lg">No questions available.</p>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
          {!quizCompleted && (
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
              
            </div>
          )}
        </div>
      )}
    </div>
  );
}
