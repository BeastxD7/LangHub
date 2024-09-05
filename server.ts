const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust if needed
    methods: ["GET", "POST"]
  }
});

interface Player {
  id: string;
  username: string;
  score: number; // Add score property
}

const players: Player[] = [];
const hints = [
  { hint: "The large gray animal with a trunk.", answer: "Elephant" },
  { hint: "A colorful plant that often blooms in gardens.", answer: "Flower" },
  { hint: "A juicy fruit with a green rind and red flesh inside.", answer: "Watermelon" },
  { hint: "An object used to write or draw, commonly found in a classroom.", answer: "Pencil" },
  { hint: "A hot beverage made from roasted beans.", answer: "Coffee" },
  { hint: "A feeling of joy and contentment.", answer: "Happy" },
  { hint: "The front part of the head where the eyes, nose, and mouth are located.", answer: "Face" },
  { hint: "A long, legless reptile.", answer: "Snake" },
  { hint: "A device that swings back and forth, often used as a timekeeping tool.", answer: "Pendulum" },
  { hint: "A soft cushion used for resting your head while sleeping.", answer: "Pillow" }
];

let currentHint = hints[Math.floor(Math.random() * hints.length)]; // Random hint selection

io.on('connection', (socket: any) => {
  console.log('A user connected:', socket.id);

  // Send the current hint to the new user
  socket.emit('currentHint', currentHint.hint);
  console.log('Current hint:', currentHint.hint);

  // Handle the username setting
  socket.on('setUsername', (username: string) => {
    if (!players.find(player => player.id === socket.id)) {
      players.push({ id: socket.id, username, score: 0 });
      io.emit('updatePlayers', players);
    }
  });

  // Handle the guess sending
  socket.on('sendGuess', (guess: string) => {
    const player = players.find(p => p.id === socket.id);
    if (player) {
      const isCorrect = guess.toLowerCase() === currentHint.answer.toLowerCase();
      if (isCorrect) {
        player.score += 1; // Increase score if correct
        io.emit('correctGuess', { id: socket.id, username: player.username });
        // Set a new hint
        currentHint = hints[Math.floor(Math.random() * hints.length)];
        io.emit('currentHint', currentHint.hint); // Send new hint to all players
      } else {
        io.emit('incorrectGuess', { guess, username: player.username });
      }
      io.emit('receiveGuess', { guess, username: player.username, isCorrect });
      io.emit('updatePlayers', players); // Update players with scores
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const index = players.findIndex(p => p.id === socket.id);
    if (index !== -1) {
      players.splice(index, 1);
      io.emit('updatePlayers', players);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
