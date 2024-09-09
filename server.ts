import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

interface Hint {
  text: string;
  answer: string;
  index?: number;  // Optional index for the hint
  total?: number;  // Optional total number of hints
}

interface User {
  id: string;
  username: string;
  score: number;
}

interface Room {
  users: User[];
  leader: string;
  hints: Hint[];
  currentHintIndex: number;
  timer: NodeJS.Timeout | null;
  guessedUsers: string[];
  correctGuessMade: boolean;
  inputDisabled: boolean; // New flag for input disablement
}

const hintsFilePath = path.join(__dirname, 'hints.json');

let hints: Hint[] = [];
try {
  hints = JSON.parse(fs.readFileSync(hintsFilePath, 'utf8'));
} catch (error) {
  console.error('Failed to read hints file:', error);
}

const rooms: Record<string, Room> = {};
const usernames: Record<string, string> = {};

const broadcastRoomStatus = (roomId: string) => {
  const room = rooms[roomId];
  if (!room) return;

  io.to(roomId).emit('room-status', {
    players: room.users,
    leader: room.leader,
    inputDisabled: room.inputDisabled, // Broadcast the input disable state
  });
};

const startHintSequence = (roomId: string) => {
  const room = rooms[roomId];
  if (!room) return;

  if (room.currentHintIndex >= room.hints.length) {
    io.to(roomId).emit('game-ended', { finalScores: room.users });
    return;
  }

  const hint = room.hints[room.currentHintIndex];
  if (!hint || !hint.answer) {
    console.error('Invalid hint data at index:', room.currentHintIndex);
    return;
  }

  room.guessedUsers = [];
  room.correctGuessMade = false;
  room.inputDisabled = false; // Enable input at the start of a new hint

  // Add hint index and total number of hints
  io.to(roomId).emit('hint', {
    text: hint.text,
    index: room.currentHintIndex + 1, // Hint index starts from 1
    total: room.hints.length, // Total number of hints
  });
  io.to(roomId).emit('input-disabled', { disabled: room.inputDisabled }); // Notify all users to enable input

  console.log(`Hint for room ${roomId}: ${hint.text}`);

  if (room.timer) clearInterval(room.timer);

  let timeLeft = 10;
  room.timer = setInterval(() => {
    timeLeft--;
    io.to(roomId).emit('timer-update', { timeLeft });
    console.log(`Timer update for room ${roomId}: ${timeLeft} seconds left`);

    if (timeLeft <= 0) {
      clearInterval(room.timer!);

      if (!room.correctGuessMade) {
        io.to(roomId).emit('reveal-answer', { answer: hint.answer, correctUsername: null });
        console.log(`Time's up! Revealing answer: ${hint.answer}`);

        setTimeout(() => {
          room.currentHintIndex++;
          startHintSequence(roomId);
        }, 5000);
      }
    }
  }, 1000);
};

const broadcastGameStatus = (roomId: string, status: string) => {
  io.to(roomId).emit('game-status', { status });
  console.log(`Game status for room ${roomId}: ${status}`);
};

io.on('connection', (socket: Socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('join-room', (roomId: string, username: string) => {
    console.log(`${username} is joining room ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: [],
        leader: '',
        hints: hints,
        currentHintIndex: 0,
        timer: null,
        guessedUsers: [],
        correctGuessMade: false,
        inputDisabled: false, // Initialize inputDisabled
      };
      console.log(`Room ${roomId} created`);
    }

    const room = rooms[roomId];
    if (room.users.some(user => user.username === username)) {
      socket.emit('username-taken', { message: 'Username is already taken' });
      console.log(`Username ${username} is already taken in room ${roomId}`);
      return;
    }

    const newUser = { id: socket.id, username, score: 0 };
    room.users.push(newUser);
    usernames[socket.id] = username;

    if (room.users.length === 1) {
      room.leader = username;
    }

    socket.join(roomId);
    broadcastRoomStatus(roomId);
  });

  socket.on('guess-word', ({ roomId, guess, username }: { roomId: string; guess: string; username: string }) => {
    console.log(`Received guess from ${username} in room ${roomId}: ${guess}`);
    const room = rooms[roomId];
    if (!room) return;

    const hint = room.hints[room.currentHintIndex];
    if (!hint) return;

    if (hint.answer.toLowerCase() === guess.toLowerCase()) {
      if (!room.guessedUsers.includes(username)) {
        const user = room.users.find(user => user.username === username);
        if (user) {
          user.score += 10;
          io.to(roomId).emit('score-update', { username, score: user.score });
          console.log(`${username} guessed correctly in room ${roomId}`);
          io.to(roomId).emit('guess-result', { username, guess, isCorrect: true });
          room.guessedUsers.push(username);

          room.correctGuessMade = true;
          room.inputDisabled = true; // Disable input for all users

          io.to(roomId).emit('reveal-answer', { answer: hint.answer, correctUsername: username });
          io.to(roomId).emit('input-disabled', { disabled: room.inputDisabled }); // Notify all users to disable input

          clearInterval(room.timer!);

          setTimeout(() => {
            room.currentHintIndex++;
            startHintSequence(roomId);
          }, 5000);
        }
      } else {
        console.log(`${username} has already guessed correctly for this hint.`);
      }
    } else {
      io.to(roomId).emit('guess-result', { username, guess, isCorrect: false });
      console.log(`${username} guessed incorrectly in room ${roomId}`);
    }
  });

  socket.on('start-game', (roomId: string) => {
    console.log(`Starting game in room ${roomId}`);
    const room = rooms[roomId];
    if (!room) return;

    broadcastGameStatus(roomId, 'Game Started');
    startHintSequence(roomId);
  });

  socket.on('play-again', (roomId: string) => {
    console.log(`Play again in room ${roomId}`);
    const room = rooms[roomId];
    if (!room) return;

    room.currentHintIndex = 0;
    room.users.forEach(user => (user.score = 0));
    room.timer && clearInterval(room.timer);
    room.timer = null;
    room.inputDisabled = false; // Reset inputDisabled for new game
    io.to(roomId).emit('game-reset');
    broadcastRoomStatus(roomId);
    startHintSequence(roomId);
  });

  socket.on('disconnect', () => {
    console.log(`Connection disconnected: ${socket.id}`);
    for (const roomId in rooms) {
      const room = rooms[roomId];
      const userIndex = room.users.findIndex(user => user.id === socket.id);

      if (userIndex !== -1) {
        console.log(`${usernames[socket.id]} disconnected from room ${roomId}`);
        room.users.splice(userIndex, 1);
        delete usernames[socket.id];
        broadcastRoomStatus(roomId);

        if (room.users.length === 0) {
          console.log(`Room ${roomId} is empty and will be deleted`);
          delete rooms[roomId];
        } else if (room.leader === usernames[socket.id]) {
          room.leader = room.users[0].username;
          console.log(`New leader assigned in room ${roomId}: ${room.leader}`);
        }
        break;
      }
    }
  });
});

app.use(cors());
app.use(express.json());

httpServer.listen(4000, () => {
  console.log('Server is running on port 4000');
});
