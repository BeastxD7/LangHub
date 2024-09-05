// app/utils/socket.ts

import { io } from 'socket.io-client';

const socket = io('https://socket-server-mfkb.onrender.com:3000');

export default socket;
