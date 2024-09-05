"use client";

import React, { useState, useEffect } from 'react';
import socket from '../../utils/socket'; // Import the socket instance

const DuelPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [guess, setGuess] = useState('');
  const [receivedGuesses, setReceivedGuesses] = useState<{ guess: string, username: string, isCorrect: boolean }[]>([]);
  const [currentHint, setCurrentHint] = useState<string | null>("");
  const [players, setPlayers] = useState<{ id: string, username: string, score: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    // Emit username when set
    if (username) {
      socket.emit('setUsername', username);
    }

    // Listen for the current hint from the server
    socket.on('currentHint', (hint: string) => {
      console.log('Received current hint:', hint); // Add logging
      setCurrentHint(hint);
      setIsLoading(false); // Hint received, stop loading
    });

    // Listen for guesses from the server
    socket.on('receiveGuess', (data: { guess: string, username: string, isCorrect: boolean }) => {
      setReceivedGuesses(prevGuesses => [...prevGuesses, data]);
    });

    // Listen for player updates from the server
    socket.on('updatePlayers', (players: { id: string, username: string, score: number }[]) => {
      setPlayers(players);
    });

    return () => {
      socket.off('currentHint');
      socket.off('receiveGuess');
      socket.off('updatePlayers');
    };
  }, [username, isLoading]);

  const handleSetUsername = () => {
    if (inputUsername.trim()) {
      setUsername(inputUsername);
      setInputUsername('');
    } else {
      console.error('Username cannot be empty');
    }
  };

  const sendGuess = () => {
    if (username) {
      socket.emit('sendGuess', guess);
      setGuess('');
    } else {
      console.error('Username must be set before sending a guess');
    }
  };

  // Get the score for the current user
  const currentPlayer = players.find(player => player.username === username);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Translation Duel</h1>
      {!username ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Set Your Username</h2>
          <input 
            type="text" 
            placeholder="Enter your username" 
            value={inputUsername} 
            onChange={(e) => setInputUsername(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button 
            onClick={handleSetUsername} 
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set Username
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
          <h2 className="text-xl font-semibold mb-4">Current Hint:</h2>
          <p className="text-2xl font-bold mb-4">{currentHint || 'Loading...'}</p>
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
          {currentPlayer && (
            <div className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded">
              <p>Score: {currentPlayer.score}</p>
            </div>
          )}
        </div>
      )}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Received Guesses</h2>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
          {receivedGuesses.length === 0 ? (
            <p className="text-gray-500">No guesses received yet.</p>
          ) : (
            receivedGuesses.map((item, index) => (
              <p key={index} className="mb-2">
                <strong className={`text-${item.isCorrect ? 'green' : 'red'}-600`}>{item.username}:</strong> {item.guess} - {item.isCorrect ? 'Correct' : 'Incorrect'}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DuelPage;
