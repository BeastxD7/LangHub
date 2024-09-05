// app/utils/socket.ts

import { io } from 'socket.io-client';

const socket = io('https://socket-server-mfkb.onrender.com/');

export default socket;
