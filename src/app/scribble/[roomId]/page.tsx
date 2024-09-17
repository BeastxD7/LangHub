"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { Clock } from 'lucide-react';
import React from 'react';


interface Player {
  username: string;
  score: number;
}

interface Guess {
  username: string;
  guess: string;
  isCorrect: boolean;
}

interface Hint {
  text: string;
  answer: string;
  index: number;
  total: number;
}

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function WordGuessingGame() {
  const router = useRouter();
  const { roomId } = useParams();
  const [username, setUsername] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [leader, setLeader] = useState<string | null>(null);
  const [isLeader, setIsLeader] = useState(false);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [hint, setHint] = useState<Hint | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [correctWord, setCorrectWord] = useState<string | null>(null);
  const [showCorrectWord, setShowCorrectWord] = useState(false);
  const [isGuessDisabled, setIsGuessDisabled] = useState(false);
  const [roomCode, setRoomCode] = useState('');


  useEffect(() => {
    if (!roomId) return;
  
   socket = io('http://localhost:4000');
  //  socket = io('https://socket-server-mfkb.onrender.com');
  
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      socket.emit('join-room', roomId, storedUsername);
  
      socket.on('username-taken', ({ message }) => {
        setUsernameError(message);
      });
    }
  
    socket.on('room-status', ({ players, leader, inputDisabled }) => {
      const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
      setPlayers(sortedPlayers);
      setLeader(leader);
      setIsLeader(leader === storedUsername);
      setIsGuessDisabled(inputDisabled);
    });
  
    socket.on('guess-result', ({ username, guess, isCorrect }: Guess) => {
      setGuesses(prev => [
        ...prev.filter(g => !(g.username === username && g.guess === guess)),
        { username, guess, isCorrect }
      ]);
  
      if (isCorrect) {
        setIsGuessDisabled(true);
      }
    });
  
    socket.on('score-update', ({ username, score }: { username: string; score: number }) => {
      setPlayers(prev =>
        [...prev.map(player =>
          player.username === username ? { ...player, score } : player
        )].sort((a, b) => b.score - a.score)
      );
    });
  
    socket.on('game-status', ({ status, correctWord, players }) => {
      setStatusMessage(status);
      if (status === 'Game Ended') {
        setGameStarted(false);
        setShowPlayAgain(true);
        setCorrectWord(correctWord);
        setShowCorrectWord(true);
        setIsGuessDisabled(true);
        // Update the players state to include the final scores
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        setPlayers(sortedPlayers);
      } else if (status === 'Game Started') {
        setGameStarted(true);
        setShowPlayAgain(false);
        setCorrectWord(null);
        setShowCorrectWord(false);
        setIsGuessDisabled(false);
      }
    });
  
    socket.on('hint', (hint: Hint) => {
      if (hint && hint.text) {
        setHint(hint);
        setShowCorrectWord(false);
        setIsGuessDisabled(false);
      } else {
        console.error('Received invalid hint data');
      }
    });
  
    socket.on('timer-update', ({ timeLeft }: { timeLeft: number }) => {
      setTimer(timeLeft);
    });
  
    socket.on('reveal-answer', ({ answer }: { answer: string }) => {
      setCorrectWord(answer);
      setShowCorrectWord(true);
      setIsGuessDisabled(true);
    });
  
    socket.on('game-reset', () => {
      setPlayers(prev =>
        [...prev.map(player => ({ ...player, score: 0 }))].sort((a, b) => b.score - a.score)
      );
      setGuesses([]);
      setHint(null);
      setTimer(null);
      setCorrectWord(null);
      setShowCorrectWord(false);
      setIsGuessDisabled(false);
    });
  
    socket.on('disable-guess-input', () => {
      setIsGuessDisabled(true);
    });
  
    return () => {
      socket.disconnect();
    };
  }, [roomId]);
  

  const handleGuessSubmit = () => {
    // Normalize the guess by trimming leading/trailing spaces and replacing multiple spaces with a single space
    const normalizedGuess = guess.trim().replace(/\s+/g, ' ');
  
    if (normalizedGuess !== '') {
      socket.emit('guess-word', { roomId, guess: normalizedGuess, username });
      setGuess('');
    }
  };
  
  
  const handlePlayAgain = () => {
    socket.emit('play-again', roomId);
    setShowPlayAgain(false);
  };

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(7);
    router.push(`/room/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomCode.trim() !== '') {
      router.push(`/room/${roomCode}`);
    }
  };

  if (!roomId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white text-center">Word Guessing Game</CardTitle>
              <CardDescription className="text-gray-300 text-center">Create a new room or join an existing one</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleCreateRoom} className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition">
                  Create Room
                </Button>
              </motion.div>
              <div className="space-y-2">
                <Input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Enter Room Code"
                  className="w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleJoinRoom} className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition">
                    Join Room
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!username) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">Enter your username</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                placeholder="Username"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => {
                    if (username.trim()) {
                      localStorage.setItem('username', username);
                      socket.emit('join-room', roomId, username);
                    }
                  }}
                  className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition"
                >
                  Join Room
                </Button>
              </motion.div>
              {usernameError && <p className="text-red-400 mt-2 text-center">{usernameError}</p>}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 sm:p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">Word Guessing Game</h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-10 text-center">Room: {roomId}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <Card className="bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white sm:block hidden">Game Status</CardTitle>
              {timer !== null && (
                <div className="flex items-center space-x-2 bg-gray-700 rounded-full px-3 py-1">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">{timer}s</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {statusMessage && (
                  <motion.p
                    key={statusMessage}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-base sm:text-lg text-purple-400 mb-2 sm:mb-4"
                  >
                    {statusMessage}
                  </motion.p>
                )}
              </AnimatePresence>
              {timer !== null && (
                <div className="mb-2 sm:mb-4 hidden sm:block">
                  <Progress value={(timer / 60) * 100} className="h-2 bg-gray-700" />
                </div>
              )}
              {showCorrectWord && correctWord && (
                <p className="text-base sm:text-lg text-purple-400 font-semibold">Correct Word: {correctWord}</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold text-white">Players</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                {players.map((player, index) => (
                  <motion.li
                    key={player.username}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center bg-gray-700 p-2 rounded"
                  >
                    <span className="text-white text-sm sm:text-base">{player.username}</span>
                    <span className="text-purple-400 text-sm sm:text-base">{player.score}<span className="hidden sm:inline"> points</span></span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300 mb-4 sm:mb-6">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">Game Area</CardTitle>
          </CardHeader>
          <CardContent>
            {gameStarted ? (
              <>
                {hint && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-gray-700 rounded"
                  >
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">Hint {hint.index} of {hint.total}</h2>
                    <p className="text-base sm:text-lg text-purple-400">{hint.text}</p>
                  </motion.div>
                )}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                  <Input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="flex-grow bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                    disabled={isGuessDisabled}
                    placeholder="Your guess..."
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleGuessSubmit}
                      className="w-full sm:w-auto bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition"
                      disabled={isGuessDisabled}
                    >
                      Submit
                    </Button>
                  </motion.div>
                </div>
                {showPlayAgain && isLeader && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handlePlayAgain}
                      className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition"
                    >
                      Play Again
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              isLeader && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => socket.emit('start-game', roomId)}
                    className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition"
                  >
                    Start Game
                  </Button>
                </motion.div>
              )
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">Guesses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[...guesses].reverse().map((g, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  // className={`p-2 rounded ${g.isCorrect ? 'bg-green-600' : 'bg-red-600'}`}
                >
                    <span
                    className={`font-semibold ${
                      g.isCorrect ? "text-green-600" : "text-red-600"
                    }`}>
                    {g.username}:
                  </span>{" "}
                  <span
                    className={` ${
                      g.isCorrect ? "text-green-600" : "text-red-600"
                    }`}>
                    {g.guess}
                  </span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
