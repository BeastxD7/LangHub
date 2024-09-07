"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import socket from '../../utils/socket';

type Player = {
  id: string;
  username: string;
  score: number;
};

type GuessData = {
  guess: string;
  username: string;
  isCorrect: boolean;
};

const DuelPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [guess, setGuess] = useState('');
  const [receivedGuesses, setReceivedGuesses] = useState<GuessData[]>([]);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [hintsCount, setHintsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameEnded, setGameEnded] = useState(false); // Track game end
  const [leaderboard, setLeaderboard] = useState<Player[]>([]); // State for leaderboard

  useEffect(() => {
    // Check if the username is stored in localStorage
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      // Redirect to the /scribble-username route if no username is found
      router.push('/scribble-username');
    } else {
      setUsername(storedUsername);
      socket.emit('setUsername', storedUsername);
    }

    // Listen for the current hint from the server
    socket.on('currentHint', (hint: string) => {
      setCurrentHint(hint);
      setIsLoading(false);
      setHintsCount((prevCount) => prevCount + 1);
    });

    // Listen for guesses from the server
    socket.on('receiveGuess', (data: GuessData) => {
      setReceivedGuesses((prevGuesses) => [...prevGuesses, data]);
    });

    // Listen for player updates from the server
    socket.on('updatePlayers', (players: Player[]) => {
      setPlayers(players);
    });

    // Listen for leaderboard from the server
    socket.on('leaderboard', (players: Player[]) => {
      // Sort players by score in descending order
      const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
      setLeaderboard(sortedPlayers);
    });

    return () => {
      socket.off('currentHint');
      socket.off('receiveGuess');
      socket.off('updatePlayers');
      socket.off('leaderboard');
    };
  }, [router]);

  const sendGuess = () => {
    if (username) {
      const trimmedGuess = guess.trim(); // Remove extra spaces
      socket.emit('sendGuess', trimmedGuess);
      setGuess('');
    } else {
      console.error('Username must be set before sending a guess');
    }
  };

  const handlePlayAgain = () => {
    // Reset game state
    setGameEnded(false);
    setLeaderboard([]);
    setHintsCount(0);
    setReceivedGuesses([]);
    setCurrentHint(null);
    
    // Optionally emit an event to reset the game on the server
    socket.emit('resetGame');
  };

  // Get the score for the current user
  const currentPlayer = players.find((player) => player.username === username);

  // Calculate the progress (limit to 100%)
  const progress = Math.min((hintsCount / 10) * 100, 100);

  // Check if the game should end (when all 10 hints are answered)
  useEffect(() => {
    if (hintsCount === 10) {
      setGameEnded(true);
      socket.emit('requestLeaderboard'); // Request the leaderboard from the server
    }
  }, [hintsCount]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Translation Duel</h1>
      {username ? (
        <>
          {gameEnded ? (
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
              {leaderboard.length === 0 ? (
                <p className="text-gray-500">No leaderboard data available.</p>
              ) : (
                <ul>
                  {leaderboard.map((player) => (
                    <li key={player.id} className="mb-2 flex justify-between">
                      <span className="font-bold">{player.username}</span>
                      <span>{player.score} points</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={handlePlayAgain}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
              >
                Play Again
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mb-4 lg:max-h-[462px] max-h-[230px] overflow-auto">
                <div className='flex justify-between items-center'>
                  <h2 className="text-xl font-semibold mb-4">Received Guesses</h2>
                  {currentPlayer && (
                    <div className="bg-gray-800 text-white p-2 rounded h-10 w-24">
                      <p>Score: {currentPlayer.score}</p>
                    </div>
                  )}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border mt-2 border-gray-300 overflow-auto">
                  {receivedGuesses.length === 0 ? (
                    <p className="text-gray-500">No guesses received yet.</p>
                  ) : (
                    receivedGuesses.map((item, index) => (
                      <p key={index} className={`mb-2 ${item.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        <strong>{item.username}:</strong> {item.guess} - {item.isCorrect ? 'Correct' : 'Incorrect'}
                      </p>
                    ))
                  )}
                </div>
              </div>

              {progress < 100 ? (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>Hint {hintsCount} of 10</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">Current Hint:</h2>
                  
                  <p className="text-xl font-bold mb-4">{currentHint || 'Something went wrong! Please close tab and reload...'}</p>

                  <h2 className="text-xl font-semibold mb-4">Enter Your Guess</h2>
                  <input 
                    type="text" 
                    value={guess} 
                    onChange={(e) => setGuess(e.target.value)} 
                    placeholder="Enter your guess" 
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <button 
                    onClick={sendGuess} 
                    className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Send Guess
                  </button>
                </div>
              ) : null }
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default DuelPage;
