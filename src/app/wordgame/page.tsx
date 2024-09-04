"use client";

import { useState } from 'react';

const words = [
  { word: "hello", hint: "A common greeting" },
  { word: "world", hint: "Our planet" },
  { word: "language", hint: "A method of communication" },
  { word: "coding", hint: "What we're doing now" },
  { word: "nextjs", hint: "A React framework" },
];

export default function WordGame() {
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [wordData] = useState(words[Math.floor(Math.random() * words.length)]);
  const [score, setScore] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toLowerCase() === wordData.word) {
      setMessage("Congratulations! You guessed the word.");
      setScore(score + 1);
    } else {
      setMessage("Try again!");
    }
  };

  const resetGame = () => {
    setGuess('');
    setMessage('');
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Word Guessing Game</h1>
      <p className="mb-4">Hint: {wordData.hint}</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Guess the word"
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
      <p className="mt-4 text-lg">{message}</p>
      <p className="mt-2 text-lg">Score: {score}</p>
      <button onClick={resetGame} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Reset Game</button>
    </div>
  );
}
