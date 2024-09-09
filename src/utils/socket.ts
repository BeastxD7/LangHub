// app/utils/socket.ts

import { io } from 'socket.io-client';

const socket = io('https://socket-server-mfkb.onrender.com/');

// const socket = io('http://localhost:4000');

export default socket;
