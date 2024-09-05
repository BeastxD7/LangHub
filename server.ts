const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

// Load hints from the external JSON file
const hints = JSON.parse(fs.readFileSync('hints.json', 'utf8'));
console.log(hints);

// Function to get 10 random hints
const getRandomHints = (numHints: number) => {
  const shuffled = hints.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numHints);
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://langhub2.vercel.app"], // Adjust if needed
    methods: ["GET", "POST"]
  }
});

const players: { id: string, username: string, score: number }[] = [];

// Select 10 random hints initially
const currentHints = getRandomHints(10);
let hintIndex = 0;

io.on('connection', (socket: any) => {
  console.log('A user connected:', socket.id);

  // Send all hints to the new user
  socket.emit('hints', currentHints);

  // Check if there are hints available before sending the current hint
  if (currentHints.length > 0 && currentHints[hintIndex]) {
    socket.emit('currentHint', currentHints[hintIndex].hint);
    console.log('Current hint:', currentHints[hintIndex].hint);
    console.log('Current answer:', currentHints[hintIndex].answer);
  } else {
    console.log('No hints available or hintIndex out of bounds');
  }

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
      const trimmedGuess = guess.trim(); // Remove extra spaces

      // Ensure hintIndex is within bounds
      if (currentHints[hintIndex]) {
        const isCorrect = trimmedGuess.toLowerCase() === currentHints[hintIndex].answer.toLowerCase();
        if (isCorrect) {
          player.score += 1; // Increase score if correct
          io.emit('correctGuess', { id: socket.id, username: player.username });

          // Move to the next hint
          hintIndex = (hintIndex + 1) % currentHints.length;
          if (currentHints[hintIndex]) {
            io.emit('currentHint', currentHints[hintIndex].hint); // Send new hint to all players
          }
        } else {
          io.emit('incorrectGuess', { guess: trimmedGuess, username: player.username });
        }
        io.emit('receiveGuess', { guess: trimmedGuess, username: player.username, isCorrect });
        io.emit('updatePlayers', players); // Update players with scores

        // Check if all hints have been used and if so, emit leaderboard
        if (hintIndex === 0) { // Assuming you want to emit after 10 hints
          io.emit('leaderboard', players);
        }
      } else {
        console.error('Hint not found for index:', hintIndex);
      }
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
