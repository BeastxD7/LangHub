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

let players: { id: string, username: string, score: number }[] = [];
let currentHints = getRandomHints(10); // Select 10 random hints initially
let hintIndex = 0; // Shared among all players to synchronize questions

// Function to calculate progress based on the hintIndex
const getProgress = () => {
  return Math.round((hintIndex / currentHints.length) * 100); // Progress in percentage
};

// Emit the current hint and sync all players
const broadcastHint = () => {
  if (currentHints[hintIndex]) {
    io.emit('currentHint', currentHints[hintIndex].hint);
    io.emit('progress', getProgress()); // Broadcast the current progress to all users
    console.log('Broadcasting hint:', currentHints[hintIndex].hint);
    console.log('Progress:', getProgress(), '%');
  } else {
    console.log('No more hints available');
  }
};

// Emit the leaderboard to all players
const updateLeaderboard = () => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  io.emit('leaderboard', sortedPlayers);
};

// Function to reset the game state
const resetGame = () => {
  currentHints = getRandomHints(10); // Reset with new random hints
  hintIndex = 0;
  players = players.map(player => ({ ...player, score: 0 })); // Reset players' scores
  broadcastHint(); // Send the new first hint to all players
  updateLeaderboard(); // Reset and update the leaderboard
};

io.on('connection', (socket: any) => {
  console.log('A user connected:', socket.id);

  // Send the current progress and hint to the new user
  if (currentHints.length > 0 && currentHints[hintIndex]) {
    socket.emit('currentHint', currentHints[hintIndex].hint);
    socket.emit('progress', getProgress()); // Send the current progress to the new user
    socket.emit('updatePlayers', players); // Send current leaderboard and scores to the new user
  }

  // Handle the username setting
  socket.on('setUsername', (username: string) => {
    if (!players.find(player => player.id === socket.id)) {
      players.push({ id: socket.id, username, score: 0 });
      io.emit('updatePlayers', players); // Update player list for all clients
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

          // Move to the next hint and synchronize it for all players
          hintIndex = (hintIndex + 1) % currentHints.length;

          // Broadcast the new hint and updated progress to all players
          broadcastHint();

          // Update the leaderboard for all players
          updateLeaderboard();

        } else {
          io.emit('incorrectGuess', { guess: trimmedGuess, username: player.username });
        }
        io.emit('receiveGuess', { guess: trimmedGuess, username: player.username, isCorrect });
        io.emit('updatePlayers', players); // Update players with scores

        // Check if all hints have been used and if so, emit leaderboard
        if (hintIndex === 0) { // Assuming you want to emit after all 10 hints
          io.emit('leaderboard', players);
        }
      } else {
        console.error('Hint not found for index:', hintIndex);
      }
    }
  });

  // Handle game reset
  socket.on('resetGame', () => {
    resetGame();
  });

  // Sync progress and questions for the newly joined player based on current state
  socket.on('syncProgress', () => {
    socket.emit('currentHint', currentHints[hintIndex].hint);
    socket.emit('progress', getProgress());
    socket.emit('updatePlayers', players); // Send current leaderboard and scores
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const index = players.findIndex(p => p.id === socket.id);
    if (index !== -1) {
      players.splice(index, 1); // Remove player on disconnect
      io.emit('updatePlayers', players); // Update remaining players
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
